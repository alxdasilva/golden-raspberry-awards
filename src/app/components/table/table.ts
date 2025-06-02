import { Component, computed, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [FormsModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
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
    this.currentPage.set(1);
  }

  @Input() pagination = false;
  @Input() pageSize = 10;

  private _rows = signal<any[]>([]);
  filters = signal<Record<string, string>>({});
  currentPage = signal(1);

  filteredRows = computed(() => {
    let data = [...this._rows()];

    for (const key in this.filters()) {
      const value = this.filters()[key]?.toLowerCase();
      if (value) {
        data = data.filter(row =>
          row[key]?.toString().toLowerCase().includes(value)
        );
      }
    }

    return data;
  });

  pagedRows = computed(() => {
    if (!this.pagination) return this.filteredRows();

    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredRows().slice(start, start + this.pageSize);
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredRows().length / this.pageSize)
  );

  getPageArray() {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  setFilter(colKey: string, value: string) {
    this.filters.update(f => ({ ...f, [colKey]: value }));
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
