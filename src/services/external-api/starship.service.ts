import { Injectable } from '@nestjs/common';
import { Starship } from 'src/models';

@Injectable()
export class StarshipApiService {
  apiBaseUrl = process.env.SWAPI_BASE_URL;

  async getStarshipById(id: number): Promise<Starship> {
    const response = await fetch(`${this.apiBaseUrl}/starships/${id}`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result as Starship;
  }

  async getPaginatedStarship(page: number): Promise<Starship[]> {
    const response = await fetch(`${this.apiBaseUrl}/starships/?page=${page}`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result.results as Starship[];
  }
}
