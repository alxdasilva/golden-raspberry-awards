export interface YearsWithMultipleWinners {
    years: Year[];
}

export interface Year {
    year: number;
    winnerCount: number;
}

export interface StudiosWithWinCount {
    studios: Studio[];
}

export interface Studio {
    name: string;
    winCount: number;
}

export interface WinIntervals {
    min: MinMax[];
    max: MinMax[];
}

export interface MinMax {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface WinnerByYear {
    id: number;
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: boolean;
}

export interface ListMovies {
    content: Content[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface Content {
    id: number;
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
}
