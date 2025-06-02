# GoldenRaspberryAwards

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.
Application with an interface to enable reading the list of nominees and winners in the Worst Picture category of the Golden Raspberry Awards.

## How to run
1. Clone the project:

```bash
git clone git@github.com:alxdasilva/golden-raspberry-awards.git
```
2. Navigate to the project directory:
```bash
cd golden-raspberry-awards
```
3. Install dependencies
```bash
npm install
```
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
## API Documentation

#### Retrieve Movies with Filters

```http
  GET https://challenge.outsera.tech/api/movies
```
#### Query Parameters:
| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `page` | `number` | Page number |
| `size` | `number` | Page size |
| `winner` | `boolean` | Filter movies by winner (true or false) |
| `year` | `number` | Filter movies by year |
| `proection` | `string` | Type of projection to retrieve (YEARS_WITH_MULTIPLE_WINNERS, STUDIOS_WITH_WIN_COUNT, MAX_MIN_WIN_INTERVAL_FOR_PRODUCERS) |


## Functionalities

- Movie Filtering – Retrieve a list of nominated and winning movies using filters like year and winner status.

- Data Projections – Fetch specific projections, such as years with multiple winners.

- Responsive Design – Optimized for a minimum resolution of 768x1280.

- Clean Code & Best Practices – Well-structured components, indentation, and high readability.

- API Integration – Connects to the Golden Raspberry Awards API for real-time data retrieval.

- Documentation & Repository Management – The code is fully documented and hosted on Git platforms.

## Color Palette

| Color               | Scsss Variable | Hex Code | Description |
|------| -----| ----|----|
| Primary | $primary | #2c2f34 | Main background color and darker ui
| Secondary | $secondary | #f5f5fa | Light background and neutral elements
| Interactive | $interactive | #0d6efd | Interactive elements such as buttons and links
| Gray Light | $gray-ligh | #ebebeb | For borders and background
| Gray medium | $gray-medium | #9b909f | For text and subtle UI elements
| Gray dark | $gray-dark | #2c2f34 | Headers and strong contrast areas