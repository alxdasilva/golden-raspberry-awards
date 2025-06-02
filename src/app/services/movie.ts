import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { WinnerByYear } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class Movie {
  private http = inject(HttpClient);
  private baseUrl = 'https://challenge.outsera.tech';
  private apiPath = '/api/movies';
  private moviesPath = '/movies';

  getMovies(params: HttpParams) {
    return this.http.get<any>(this.moviesPath, { params });
  }

  getProjection<T>(projectionType: string): Observable<T> {
    const params = new HttpParams().set('projection', projectionType);
    return this.http.get<T>(`${this.baseUrl + this.apiPath}`, { params });
  }

  getWinnersByYear(year: number): Observable<WinnerByYear[]> {
    return this.http.get<WinnerByYear[]>(
      `${this.baseUrl + this.apiPath}?winner=true&year=${year}`
    );
  }
}
