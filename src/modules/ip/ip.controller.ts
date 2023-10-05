import { Controller, Get, Param, Delete } from '@nestjs/common';
import { IpService } from './ip.service';
import { IpDto } from './dto/ip.dto';

@Controller('ip')
export class IpController {
  constructor(private readonly ipLookupService: IpService) {}

  @Get('/:ipAddress')
  async lookupIpInfo(@Param() params: IpDto) {
    const { ipAddress } = params;
    return this.ipLookupService.lookupIp(ipAddress);
  }

  @Delete('/:ipAddress')
  async removeCachedIpInfo(@Param() params: IpDto) {
    const { ipAddress } = params;
    return this.ipLookupService.removeCachedIp(ipAddress);
  }
}
