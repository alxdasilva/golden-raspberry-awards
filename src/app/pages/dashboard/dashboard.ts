import { Component, inject, signal } from '@angular/core';
import { Table } from '../../components/table/table';
import { Card } from '../../components/card/card';
import { Movie } from '../../services/movie';
import {
  MinMax,
  StudiosWithWinCount,
  WinIntervals,
  WinnerByYear,
  YearsWithMultipleWinners,
} from '../../models/movie';
import { ProjectionType } from '../../models/projection';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

const DEBOUNCE_TIME = 600;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Table, Card, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly movieService = inject(Movie);
  moviesWithMultipleWinners = signal<YearsWithMultipleWinners>({ years: [] });
  studiosWithWinCount = signal<StudiosWithWinCount>({ studios: [] });
  maxInterval = signal<MinMax[]>([]);
  minInterval = signal<MinMax[]>([]);
  winnersByYear = signal<WinnerByYear[]>([]);

  ngOnInit(): void {
    this.getYearsWithMultipleWinners();
    this.getStudiosWithWinCount();
    this.getWinIntervals();
  }

  getYearsWithMultipleWinners(): void {
    this.movieService
      .getProjection<YearsWithMultipleWinners>(
        ProjectionType.YEARS_WITH_MULTIPLE_WINNERS
      )
      .subscribe((data: YearsWithMultipleWinners) => {
        this.moviesWithMultipleWinners.set(data);
      });
  }

  getStudiosWithWinCount(): void {
    this.movieService
      .getProjection<StudiosWithWinCount>(ProjectionType.STUDIOS_WITH_WIN_COUNT)
      .subscribe((data: StudiosWithWinCount) => {
        const top3Studios = data.studios
          .sort((a, b) => b.winCount - a.winCount)
          .slice(0, 3);

        this.studiosWithWinCount.set({ studios: top3Studios });
      });
  }

  getWinIntervals(): void {
    this.movieService
      .getProjection<WinIntervals>(
        ProjectionType.MAX_MIN_WIN_INTERVAL_FOR_PRODUCERS
      )
      .subscribe((data: WinIntervals) => {
        this.maxInterval.set(data.max);
        this.minInterval.set(data.min);
      });
  }

  getWinnersByYear(newValue: string): void {
    const numberValue = Number(newValue);
    if (!isNaN(numberValue)) {
      this.movieService.getWinnersByYear(numberValue).subscribe(data => this.winnersByYear.set(data))
    }
  }
}
