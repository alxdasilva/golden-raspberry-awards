import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { Movie } from '../../services/movie';
import { of } from 'rxjs';
import { ProjectionType } from '../../models/projection';
import { YearsWithMultipleWinners, StudiosWithWinCount, WinIntervals, WinnerByYear, MinMax, Studio, Year } from '../../models/movie';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let mockMovieService: jasmine.SpyObj<Movie>;

  beforeEach(async () => {
    mockMovieService = jasmine.createSpyObj('Movie', ['getProjection', 'getWinnersByYear']);

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [{ provide: Movie, useValue: mockMovieService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data on ngOnInit', () => {
    spyOn(component, 'getYearsWithMultipleWinners');
    spyOn(component, 'getStudiosWithWinCount');
    spyOn(component, 'getWinIntervals');

    component.ngOnInit();

    expect(component.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(component.getStudiosWithWinCount).toHaveBeenCalled();
    expect(component.getWinIntervals).toHaveBeenCalled();
  });

  it('should update moviesWithMultipleWinners when getYearsWithMultipleWinners is called', () => {
    const mockData: YearsWithMultipleWinners = { years: [{ year: 2020, winnerCount: 2 }] as Year[] };
    mockMovieService.getProjection.and.returnValue(of(mockData));

    component.getYearsWithMultipleWinners();

    expect(component.moviesWithMultipleWinners()).toEqual(mockData);
  });

  it('should update studiosWithWinCount when getStudiosWithWinCount is called', () => {
    const mockData: StudiosWithWinCount = { studios: [{ name: 'Studio A', winCount: 5 }, { name: 'Studio B', winCount: 3 }] as Studio[] };
    mockMovieService.getProjection.and.returnValue(of(mockData));

    component.getStudiosWithWinCount();

    expect(component.studiosWithWinCount()).toEqual({ studios: mockData.studios });
  });

  it('should update maxInterval and minInterval when getWinIntervals is called', () => {
    const mockData: WinIntervals = {
      max: [{ producer: 'Prod A', interval: 10, previousWin: 2000, followingWin: 2010 }] as MinMax[],
      min: [{ producer: 'Prod B', interval: 2, previousWin: 2018, followingWin: 2020 }] as MinMax[]
    };
    mockMovieService.getProjection.and.returnValue(of(mockData));

    component.getWinIntervals();

    expect(component.maxInterval()).toEqual(mockData.max);
    expect(component.minInterval()).toEqual(mockData.min);
  });

  it('should update winnersByYear when getWinnersByYear is called with valid number', () => {
    const mockData: WinnerByYear[] = [{ id: 1, year: 2022, title: 'Movie A', studios: ['Studio X'], producers: ['Producer Y'], winner: true }];
    mockMovieService.getWinnersByYear.and.returnValue(of(mockData));

    component.getWinnersByYear('2022');

    expect(component.winnersByYear()).toEqual(mockData);
  });

});
