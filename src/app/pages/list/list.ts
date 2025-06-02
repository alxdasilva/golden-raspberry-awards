import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '../../components/table/table';
import { Card } from '../../components/card/card';
import { Movie } from '../../services/movie';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [Table, Card],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit {

  private readonly movieService = inject(Movie);
  movies = signal<Movie[]>([]);
  page = signal(0);
  totalPages = signal(1);
  totalElements = signal(0);
  columns = [
    { key: 'id', label: 'Id' },
    { key: 'year', label: 'Year', filterType: 'text' },
    { key: 'title', label: 'Title' },
    { key: 'winner', label: 'Winner?', filterType: 'select', filterOptions: ['Yes', 'No'] }
  ];

  ngOnInit(): void {
    this.getMovies(0);
  }

  getMovies(pageNumber: number): void {
    this.movieService.getMovies(pageNumber).subscribe((response: any) => {
      const movies = response?._embedded?.movies ?? [];

      this.movies.set(movies);
      this.page.set(response?.page?.number ?? 0);
      this.totalPages.set(response?.page?.totalPages ?? 1);
      this.totalElements.set(response?.page?.totalElements ?? movies.length);
    });
  }

}
