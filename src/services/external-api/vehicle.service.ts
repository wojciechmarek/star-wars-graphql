import { Injectable } from '@nestjs/common';
import { Vehicle } from 'src/models';

@Injectable()
export class VehicleApiService {
  apiBaseUrl = process.env.SWAPI_BASE_URL;

  async getVehicleById(id: number): Promise<Vehicle> {
    const response = await fetch(`${this.apiBaseUrl}/vehicles/${id}`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result as Vehicle;
  }

  async getPaginatedVehicles(page: number): Promise<Vehicle[]> {
    const response = await fetch(`${this.apiBaseUrl}/vehicles/?page=${page}`);
    const result = await response.json();

    if (result.detail) {
      throw new Error(result.detail);
    }

    return result.results as Vehicle[];
  }
}
