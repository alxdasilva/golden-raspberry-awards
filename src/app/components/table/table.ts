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
  @Input() columns: { key: string; label: string; filterType?: 'text' | 'select'; filterOptions?: string[]; }[] = [];

  @Input() set rows(value: any[]) {
    this._rows.set(value || []);
  }

  @Input() pagination = false;
  @Input() pageSize = 10;

  @Input() totalElements: number = 0;
  @Input() pageNumber: number = 0;
  @Input() totalPagesInput: number = 1;
  totalPagesSignal = signal<number>(this.totalPagesInput);
  @Input() goToPageCallback?: (page: number) => void;

  private _rows = signal<any[]>([]);
  filters = signal<Record<string, string>>({});

  filteredRows = computed(() => {
    let data = [...this._rows()];
    for (const key in this.filters()) {
      const value = this.filters()[key]?.toLowerCase();
      if (value) {
        data = data.filter(row => row[key]?.toString().toLowerCase().includes(value));
      }
    }
    return data;
  });

  currentPage = computed(() => this.pageNumber + 1);
  totalPages = computed(() => this.totalPagesInput);
  pagedRows = computed(() => this.filteredRows());

  getPageArray(): number[] {
    return Array.from({ length: this.totalPagesInput }, (_, i) => i + 1);
  }

  setFilter(colKey: string, value: string) {
    this.filters.update(f => ({ ...f, [colKey]: value }));
    if (this.goToPageCallback) this.goToPageCallback(0);
  }

  goToPage(page: number) {
    if (this.goToPageCallback && page >= 0 && page < this.totalPagesInput) {
      this.goToPageCallback(page);
    }
  }
}
