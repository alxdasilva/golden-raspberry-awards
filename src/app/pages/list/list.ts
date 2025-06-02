import { Content, ListMovies, Pageable } from './../../models/movie';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '../../components/table/table';
import { Card } from '../../components/card/card';
import { Movie } from '../../services/movie';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [Table, Card],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  private readonly movieService = inject(Movie);
  movies = signal<Content[]>([]);
  page = signal(0);
  totalPages = signal(1);
  totalElements = signal(0);
  columns = [
    { key: 'id', label: 'Id' },
    { key: 'year', label: 'Year', filterType: 'text' },
    { key: 'title', label: 'Title' },
    {
      key: 'winner',
      label: 'Winner?',
      filterType: 'select',
      filterOptions: ['Yes', 'No'],
    },
  ];

  ngOnInit(): void {
    this.getMovies({ page: 0, filters: {} });
  }

  getMovies = ({
    page,
    filters,
  }: {
    page: number;
    filters: Record<string, string>;
  }) => {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', '15');


    if (filters['winner'] === 'Yes') {
      params = params.set('winner', 'true');
    } else if (filters['winner'] === 'No') {
      params = params.set('winner', 'false');
    }
    if (filters?.['year']) {
      params = params.set('year', filters['year'])
    }

    this.movieService.getMovies(params).subscribe((response: ListMovies) => {
      this.movies.set(response?.content ?? []);
      this.page.set(response?.pageable?.pageNumber ?? 1);
      this.totalPages.set(response?.pageable?.pageSize ?? 1);
      this.totalElements.set(response?.totalElements);
    });
  };
}
