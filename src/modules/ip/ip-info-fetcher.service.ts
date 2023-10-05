import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IpInfo } from './entities/ip-info.entity';

@Injectable()
export class IpInfoFetcherService {
  constructor(private configService: ConfigService) {}

  async fetchIpInfo(ip: string): Promise<IpInfo> {
    const response = await axios.get(
      `${this.configService.get('ip.baseUrl')}${ip}`,
    ); //todo: handle errors

    const ipInfo = new IpInfo();
    ipInfo.ipAddress = ip;
    ipInfo.info = response.data;

    return ipInfo;
  }
}
