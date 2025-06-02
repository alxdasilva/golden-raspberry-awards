import { Component, computed, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [FormsModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  @Input() title?: string;
  @Input() columns: {
    key: string;
    label: string;
    filterType?: 'text' | 'select';
    filterOptions?: string[];
  }[] = [];

  @Input() set rows(value: any[]) {
    this._rows.set(value || []);
  }

  @Input() pagination = false;
  @Input() pageSize = 10;

  @Input() totalElements: number = 0;
  @Input() set pageNumber(value: number) {
    this._pageNumber.set(value);
  }
  private _pageNumber = signal(0);
  currentPage = computed(() => this._pageNumber() + 1);
  @Input() goToPageCallback?: (params: {
    page: number;
    filters: Record<string, string>;
  }) => void;

  @Input() set totalPagesInput(value: number) {
    this._totalPages.set(value);
  }
  private _totalPages = signal(1);

  private _rows = signal<any[]>([]);
  filters = signal<Record<string, string>>({});

  filteredRows = computed(() => {
    let data = [...this._rows()];
    const activeFilters = this.filters();

    return data.filter((row) => {
      return Object.entries(activeFilters).every(([key, value]) => {
        if (!value) return true;

        const rowValue = row[key];

        if (key === 'winner') {
          if (value === 'Yes') return rowValue === true;
          if (value === 'No') return rowValue === false;
        }

        return rowValue?.toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  });

  totalPages = computed(() => this._totalPages());
  pagedRows = computed(() => this.filteredRows());

  getPageArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  setFilter(colKey: string, value: string) {
    this.filters.update((f) => ({ ...f, [colKey]: value }));

    if (this.goToPageCallback) {
      this.goToPageCallback({ page: 0, filters: this.filters() });
    }
  }

  goToPage(page: number) {
    if (this.goToPageCallback && page <= this.totalPages()) {
      this.goToPageCallback({ page, filters: this.filters() });
    }
  }
}
