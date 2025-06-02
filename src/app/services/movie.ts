import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { WinnerByYear } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class Movie {
  private http = inject(HttpClient);
  private baseUrl = 'https://challenge.outsera.tech/api/movies';
  private pageSignal = signal<number>(1);

  getMovies(size: number = 15) {
    const params = new HttpParams()
      .set('page', this.pageSignal())
      .set('size', size.toString())
      .set('year', 1982);

    return this.http.get<any>(this.baseUrl, { params });
  }

  getProjection<T>(projectionType: string): Observable<T> {
    const params = new HttpParams().set('projection', projectionType);
    return this.http.get<T>(`${this.baseUrl}`, { params });
  }

  getWinnersByYear(year: number): Observable<WinnerByYear | WinnerByYear[]> {
    return this.http.get<WinnerByYear | WinnerByYear[]>(`${this.baseUrl}?winner=true&year=${year}`);
  }

  setPage(page: number) {
    this.pageSignal.set(page);
    this.getMovies();
  }
}
