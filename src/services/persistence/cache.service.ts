import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma';
import moment from 'moment';
import { Cache } from 'src/models';

@Injectable()
export class CacheService {
  constructor(private prisma: PrismaService) {}

  async manageCache<T>(type: string, newData: () => Promise<T>): Promise<T> {
    const cache = await this.getCache(type);

    if (cache && this.isCacheValid(cache)) {
      return JSON.parse(cache.value) as T;
    } else if (cache) {
      await this.markAsExpired(cache.id);
    }

    const newCache = await this.addCache(type, await newData());

    return JSON.parse(newCache.value) as T;
  }

  private async addCache(type: string, value: unknown): Promise<Cache> {
    try {
      return this.prisma.cache.create({
        data: {
          expires_at: moment().add(1, 'day').toDate(),
          is_expired: false,
          type,
          value: JSON.stringify(value),
        },
      });
    } catch (error) {
      console.log('Prisma error occurred:' + error);
    }
  }

  private async getCache(type: string): Promise<Cache> {
    try {
      return this.prisma.cache.findFirst({
        where: {
          type,
          is_expired: false,
        },
      });
    } catch (error) {
      console.log('Prisma error occurred:' + error);
    }
  }

  private async markAsExpired(id: number) {
    try {
      await this.prisma.cache.update({
        where: {
          id,
        },
        data: {
          is_expired: true,
        },
      });
    } catch (error) {
      console.log('Prisma error occurred:' + error);
    }
  }

  private isCacheValid(cache: Cache) {
    return moment(cache.expires_at).isAfter(moment());
  }
}
