import { Injectable } from '@nestjs/common';
import { Person } from 'src/models';

@Injectable()
export class PersonApiService {
  apiBaseUrl = process.env.SWAPI_BASE_URL;

  async getAllPeople(): Promise<Person[]> {
    const people: Person[] = [];
    let page = 1;

    while (true) {
      const response = await fetch(`${this.apiBaseUrl}/people?page=${page}`);
      const data = await response.json();

      if (data?.detail) {
        throw new Error(data.detail);
      }

      people.push(...(data.results as Person[]));

      if (!data.next) {
        break;
      }

      page++;
    }

    return people;
  }
}
