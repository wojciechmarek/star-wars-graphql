import { Injectable } from '@nestjs/common';
import { Planet } from 'src/models';

@Injectable()
export class PlanetApiService {
  apiBaseUrl = process.env.SWAPI_BASE_URL;

  async getPlanetById(id: number): Promise<Planet> {
    const response = await fetch(`${this.apiBaseUrl}/planets/${id}`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result as Planet;
  }

  async getPaginatedPlanets(page: number): Promise<Planet[]> {
    const response = await fetch(`${this.apiBaseUrl}/planets/?page=${page}`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result.results as Planet[];
  }
}
