export interface MovieLink {
    href: string;
}

export interface MovieLinks {
    self: MovieLink;
    movie: MovieLink;
}

export interface MovieResponse {
    year: number;
    title: string;
    studios: string[];
    producers: string[];
    winner: boolean;
    _links: MovieLinks;
}

export interface EmbeddedMovies {
    movies: MovieResponse[];
}

export interface Pagination {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

export interface ApiLinks {
    first: MovieLink;
    self: MovieLink & { templated?: boolean };
    next: MovieLink;
    last: MovieLink;
    profile: MovieLink;
    search: MovieLink;
}

export interface MovieApiResponse {
    _embedded: EmbeddedMovies;
    _links: ApiLinks;
    page: Pagination;
}

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
