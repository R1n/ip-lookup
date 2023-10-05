import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository, LessThan } from 'typeorm';
import { IpInfo } from './entities/ip-info.entity';
import { IpInfoFetcherService } from './ip-info-fetcher.service';

@Injectable()
export class IpService {
  private readonly CACHE_TTL_SECONDS = 60;

  constructor(
    @InjectRepository(IpInfo)
    private readonly ipInfoRepository: Repository<IpInfo>,
    private readonly ipInfoFetcherService: IpInfoFetcherService,
  ) {}

  async lookupIp(ip: string): Promise<IpInfo> {
    const cachedIpInfo = await this.ipInfoRepository.findOneBy({
      ipAddress: ip,
    });
    if (cachedIpInfo) {
      return cachedIpInfo;
    }

    // If not cached, fetch the IP info from the external API (e.g., ipwhois.io)
    const ipInfo = await this.ipInfoFetcherService.fetchIpInfo(ip);

    await this.ipInfoRepository.save(ipInfo);

    return ipInfo;
  }

  async removeCachedIp(ip: string): Promise<void> {
    await this.ipInfoRepository.delete({ ipAddress: ip });
  }

  @Cron(CronExpression.EVERY_MINUTE) // Runs every minute
  async removeExpiredCache() {
    const expirationTime = new Date(
      new Date().getTime() - this.CACHE_TTL_SECONDS * 1000,
    );

    const filter = { where: { createdAt: LessThan(expirationTime) } };
    const expiredCache = await this.ipInfoRepository.find(filter);

    if (expiredCache.length === 0) {
      return;
    }

    for (const entry of expiredCache) {
      await this.removeCachedIp(entry.ipAddress);
    }
  }
}
