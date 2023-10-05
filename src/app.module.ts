import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { IpModule } from './modules/ip/ip.module';
import { configModuleOptions } from './config/config-module.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('postgres'),
    }),
    ScheduleModule.forRoot(),
    IpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
