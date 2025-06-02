import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Table } from './table';
import { FormsModule } from '@angular/forms';

describe('Table Component', () => {
  let component: Table;
  let fixture: ComponentFixture<Table>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Table);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize inputs correctly', () => {
    component.title = 'Test Table';
    component.columns = [{ key: 'name', label: 'Name' }];
    component.rows = [{ name: 'Item 1' }, { name: 'Item 2' }];
    component.pagination = true;
    component.pageSize = 5;
    component.totalElements = 10;
    component.totalPagesInput = 3;

    fixture.detectChanges();

    expect(component.title).toBe('Test Table');
    expect(component.columns.length).toBe(1);
    expect(component.totalPages()).toBe(3);
    expect(component.pagination).toBeTrue();
  });

  it('should filter rows based on text input', () => {
    component.rows = [{ name: 'Item 1' }, { name: 'Test Item' }];
    component.filters.set({ name: 'Test' });

    fixture.detectChanges();

    expect(component.filteredRows().length).toBe(1);
    expect(component.filteredRows()[0].name).toBe('Test Item');
  });

  it('should filter rows based on select input', () => {
    component.rows = [
      { name: 'Item 1', winner: true },
      { name: 'Item 2', winner: false },
    ];
    component.filters.set({ winner: 'Yes' });

    fixture.detectChanges();

    expect(component.filteredRows().length).toBe(1);
    expect(component.filteredRows()[0].winner).toBeTrue();
  });

  it('should set filters using setFilter()', () => {
    component.setFilter('name', 'Example');
    fixture.detectChanges();

    expect(component.filters()['name']).toBe('Example');
  });

  it('should update pagination values', () => {
    component.totalPagesInput = 5;
    component.pageNumber = 2;

    fixture.detectChanges();

    expect(component.totalPages()).toBe(5);
    expect(component.currentPage()).toBe(3);
  });

  it('should generate correct page array', () => {
    component.totalPagesInput = 3;
    fixture.detectChanges();

    expect(component.getPageArray()).toEqual([1, 2, 3]);
  });

  it('should call goToPageCallback when pagination is triggered', () => {
    const mockCallback = jasmine.createSpy('mockCallback');
    component.goToPageCallback = mockCallback;
    component.totalPagesInput = 5
    component.goToPage(2);

    fixture.detectChanges();

    expect(mockCallback).toHaveBeenCalledWith({ page: 2, filters: component.filters() });
  });

  it('should not call goToPageCallback when page is out of bounds', () => {
    const mockCallback = jasmine.createSpy('mockCallback');
    component.goToPageCallback = mockCallback;
    component.totalPagesInput = 3;

    component.goToPage(5);

    fixture.detectChanges();

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should return all rows when filters are empty or undefined', () => {
    component.rows = [
      { name: 'Item 1', winner: true },
      { name: 'Item 2', winner: false }
    ];

    component.filters.set({ name: '' });
    fixture.detectChanges();

    expect(component.filteredRows().length).toBe(2);
  });

  it('should filter winner when using Yes and No', () => {
    component.rows = [
      { name: 'Item 1', winner: true },
      { name: 'Item 2', winner: false },
      { name: 'Item 3', winner: null }
    ];

    component.filters.set({ winner: 'Yes' });
    fixture.detectChanges();
    expect(component.filteredRows().length).toBe(1);
    expect(component.filteredRows()[0].winner).toBeTrue();

    component.filters.set({ winner: 'No' });
    fixture.detectChanges();
    expect(component.filteredRows().length).toBe(1);
    expect(component.filteredRows()[0].winner).toBeFalse();

    component.filters.set({ winner: '' });
    fixture.detectChanges();
    expect(component.filteredRows().length).toBe(3);
  });

  it('should call goToPageCallback with page 0 when setting a filter', () => {
    const mockCallback = jasmine.createSpy('mockCallback');
    component.goToPageCallback = mockCallback;

    component.setFilter('name', 'Test');
    fixture.detectChanges();

    expect(mockCallback).toHaveBeenCalledWith({ page: 0, filters: component.filters() });
  });

});
