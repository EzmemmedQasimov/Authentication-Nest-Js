import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';

@Module({
  imports: [Report],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
