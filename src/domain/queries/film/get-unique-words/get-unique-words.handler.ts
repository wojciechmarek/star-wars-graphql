import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUniqueWordsQuery } from './get-unique-words.query';
import { FilmApiService } from 'src/services/external-api';
import { CacheService } from 'src/services/persistence';
import { Film } from 'src/models';

@QueryHandler(GetUniqueWordsQuery)
export class GetUniqueWordsQueryHandler
  implements IQueryHandler<GetUniqueWordsQuery>
{
  constructor(
    private readonly filmApiService: FilmApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(): Promise<string> {
    const cachedAllFilms = await this.cacheService.manageCache<Film[]>(
      `GetUniqueWordsQuery`,
      () => this.filmApiService.getAllFilms(),
    );

    const openingCrawls = cachedAllFilms.map((film) => film.opening_crawl);
    const onlyWordsFromOpeningCrawls = openingCrawls
      .join(' ')
      .replace(/(\r\n|\n|\r)/gm, ' ')
      .replace(/[!.,]/g, ' ')
      .replace(/  +/g, ' ')
      .toLowerCase();

    const words = onlyWordsFromOpeningCrawls.split(' ');
    const uniqueWords = [...new Set(words)];

    const tableOfUniqueWords = uniqueWords.map((word) => {
      const count = words.filter((w) => w === word).length;
      return { word, count };
    });

    const sortedTableOfUniqueWords = tableOfUniqueWords.sort((a, b) =>
      a.count < b.count ? 1 : -1,
    );

    const tableOfUniqueWordsString = sortedTableOfUniqueWords
      .map((word) => `${word.word} - ${word.count}`)
      .join('\r\n');

    return tableOfUniqueWordsString;
  }
}
