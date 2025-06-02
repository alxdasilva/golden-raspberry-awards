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
  moviesWithMultipleWinners = signal<any>(null);
  movies = signal([
    { id: 1, year: 1980, title: 'Cruising', winner: 'No' },
    { id: 2, year: 1980, title: 'The Formula', winner: 'No' },
    { id: 3, year: 1980, title: 'Can\'t Stop the Music', winner: 'Yes' },
    { id: 5, year: 1981, title: 'Mommie Dearest', winner: 'Yes' },
    { id: 6, year: 1981, title: 'Mommie Dearest', winner: 'Yes' },
    { id: 7, year: 1981, title: 'Mommie Dearest', winner: 'Yes' },
    { id: 8, year: 1981, title: 'Mommie Dearest', winner: 'Yes' },
    { id: 9, year: 1981, title: 'Mommie Dearest', winner: 'Yes' },
    { id: 10, year: 1981, title: 'Mommie Dearest', winner: 'Yes' },
    { id: 11, year: 1981, title: 'Mommie Dearest', winner: 'Yes' }
  ]);

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(data => {
      this.moviesWithMultipleWinners.set(data);
      console.log(data)
    });
  }
}
