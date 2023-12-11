import { Injectable } from '@nestjs/common';
import { Species } from 'src/models';

@Injectable()
export class SpeciesApiService {
  apiBaseUrl = process.env.SWAPI_BASE_URL;

  async getSpeciesById(id: number): Promise<Species> {
    const response = await fetch(`${this.apiBaseUrl}/species/${id}`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result as Species;
  }

  async getPaginatedSpecies(page: number): Promise<Species[]> {
    const response = await fetch(`${this.apiBaseUrl}/species/?page=${page}`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result.results as Species[];
  }
}
