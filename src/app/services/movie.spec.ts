import { TestBed } from '@angular/core/testing';
import { Movie } from './movie';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpParams, provideHttpClient } from '@angular/common/http';

describe('Movie Service', () => {
  let service: Movie;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://challenge.outsera.tech/api/movies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Movie, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(Movie);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies with provided params', () => {
    const params = new HttpParams().set('page', '1').set('size', '10');
    service.getMovies(params).subscribe();

    const req = httpMock.expectOne(`${baseUrl}?page=1&size=10`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch projections with correct query params', () => {
    const projectionType = 'YEARS_WITH_MULTIPLE_WINNERS';
    service.getProjection(projectionType).subscribe();

    const req = httpMock.expectOne(`${baseUrl}?projection=${projectionType}`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch winners by year with correct parameters', () => {
    const year = 2023;
    service.getWinnersByYear(year).subscribe();

    const req = httpMock.expectOne(`${baseUrl}?winner=true&year=2023`);
    expect(req.request.method).toBe('GET');
  });

  it('should handle empty responses gracefully', () => {
    const year = 2025;
    service.getWinnersByYear(year).subscribe((data) => {
      expect(data).toEqual([]);
    });

    const req = httpMock.expectOne(`${baseUrl}?winner=true&year=2025`);
    req.flush([]);
  });
});
