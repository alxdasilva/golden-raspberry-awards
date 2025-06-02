import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { WinnerByYear } from '../models/movie';
import { ProjectionType } from '../models/projection';

@Injectable({
  providedIn: 'root',
})
export class Movie {
  private http = inject(HttpClient);
  private baseUrl = 'https://challenge.outsera.tech/api/movies';

  getMovies(params: HttpParams) {
    return this.http.get<any>(this.baseUrl, { params });
  }

  getProjection<T>(projectionType: string): Observable<T> {
    const params = new HttpParams().set('projection', projectionType);
    return this.http.get<T>(`${this.baseUrl}`, { params });
  }

  getWinnersByYear(year: number): Observable<WinnerByYear[]> {
    return this.http.get<WinnerByYear[]>(
      `${this.baseUrl}?winner=true&year=${year}`
    );
  }
}
