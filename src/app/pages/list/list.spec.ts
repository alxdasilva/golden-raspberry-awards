import { ComponentFixture, TestBed } from '@angular/core/testing';
import { List } from './list';
import { Movie } from '../../services/movie';
import { of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Content, ListMovies, Pageable } from './../../models/movie';

describe('List Component', () => {
  let component: List;
  let fixture: ComponentFixture<List>;
  let mockMovieService: jasmine.SpyObj<Movie>;

  beforeEach(async () => {
    mockMovieService = jasmine.createSpyObj('Movie', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [List],
      providers: [{ provide: Movie, useValue: mockMovieService }],
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    mockMovieService.getMovies.calls.reset();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and call getMovies on ngOnInit', () => {
    spyOn(component, 'getMovies');

    component.ngOnInit();

    expect(component.getMovies).toHaveBeenCalledWith({ page: 0, filters: {} });
  });

  it('should update movie list when getMovies is called', () => {
    const mockData: ListMovies = {
      content: [{ id: 1, year: 2022, title: 'Movie A', studios: ['Studio X'], producers: ['Producer Y'], winner: true }],
      pageable: { pageNumber: 2, pageSize: 3 } as Pageable,
      totalPages: 5,
      totalElements: 10,
      last: false,
      size: 15,
      number: 2,
      sort: { unsorted: false, sorted: true, empty: false },
      numberOfElements: 1,
      first: true,
      empty: false,
    };

    mockMovieService.getMovies.and.returnValue(of(mockData));
    component.getMovies({ page: 2, filters: {} });

    expect(component.movies()).toEqual(mockData.content);
    expect(component.page()).toBe(2);
    expect(component.totalPages()).toBe(3);
    expect(component.totalElements()).toBe(10);
  });

  it('should set correct filters for winner and year', () => {
    const mockParams = new HttpParams()
      .set('page', '1')
      .set('size', '15')
      .set('winner', 'true')
      .set('year', '2022');

    mockMovieService.getMovies.and.returnValue(of({} as ListMovies));

    component.getMovies({ page: 1, filters: { winner: 'Yes', year: '2022' } });

    expect(mockMovieService.getMovies).toHaveBeenCalled();
    expect(mockMovieService.getMovies.calls.argsFor(0)[0].toString()).toContain(mockParams.toString());
  });

  it('should correctly map filters when winner is "No"', () => {
    const mockParams = new HttpParams()
      .set('page', '1')
      .set('size', '15')
      .set('winner', 'false');

    mockMovieService.getMovies.and.returnValue(of({} as ListMovies));

    component.getMovies({ page: 1, filters: { winner: 'No' } });

    expect(mockMovieService.getMovies).toHaveBeenCalled();
    expect(mockMovieService.getMovies.calls.argsFor(0)[0].toString()).toContain(mockParams.toString());
  });

  it('should correctly map filters when year is provided', () => {
    const mockParams = new HttpParams()
      .set('page', '1')
      .set('size', '15')
      .set('year', '2023');

    mockMovieService.getMovies.and.returnValue(of({} as ListMovies));

    component.getMovies({ page: 1, filters: { year: '2023' } });

    expect(mockMovieService.getMovies).toHaveBeenCalled();
    expect(mockMovieService.getMovies.calls.argsFor(0)[0].toString()).toContain(mockParams.toString());
  });

  it('should not map filters when year is undefined', () => {
    const mockParams = new HttpParams()
      .set('page', '1')
      .set('size', '15');

    mockMovieService.getMovies.and.returnValue(of({} as ListMovies));

    component.getMovies({ page: 1, filters: {} });

    expect(mockMovieService.getMovies).toHaveBeenCalled();
    expect(mockMovieService.getMovies.calls.argsFor(0)[0].toString()).toContain(mockParams.toString());
    expect(mockMovieService.getMovies.calls.argsFor(0)[0].toString()).not.toContain('year');
  });
});
