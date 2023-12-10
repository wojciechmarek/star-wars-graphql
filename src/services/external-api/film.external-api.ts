import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmApiService {
  apiBaseUrl = 'https://swapi.dev/api';

  async getFilmById(id: string) {
    const response = await fetch(`${this.apiBaseUrl}/films/${id}`);
    return response.json();
  }

  async getPaginatedFilms(page: number) {
    const response = await fetch(`${this.apiBaseUrl}/films/?page=${page}`);
    return response.json();
  }

  async getAllFilms() {
    const response = await fetch(`${this.apiBaseUrl}/films/`);
    return response.json();
  }
}
