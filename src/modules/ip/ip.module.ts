import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpController } from './ip.controller';
import { IpService } from './ip.service';
import { IpInfo } from './entities/ip-info.entity';
import { IpInfoFetcherService } from './ip-info-fetcher.service';

@Module({
  imports: [TypeOrmModule.forFeature([IpInfo])],
  controllers: [IpController],
  providers: [IpService, IpInfoFetcherService],
})
export class IpModule {}
