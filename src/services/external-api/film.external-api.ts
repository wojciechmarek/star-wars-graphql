import { Injectable } from '@nestjs/common';
import { Film } from 'src/models';

@Injectable()
export class FilmApiService {
  apiBaseUrl = 'https://swapi.dev/api';

  async getFilmById(id: number): Promise<Film> {
    const response = await fetch(`${this.apiBaseUrl}/films/${id}`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result as Film;
  }

  async getPaginatedFilms(page: number): Promise<Film[]> {
    const response = await fetch(`${this.apiBaseUrl}/films/?page=${page}`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result.results as Film[];
  }

  async getAllFilms(): Promise<Film[]> {
    const response = await fetch(`${this.apiBaseUrl}/films/`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result.results as Film[];
  }
}
