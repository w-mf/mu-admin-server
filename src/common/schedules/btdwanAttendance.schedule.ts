import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class BtdwanAttendanceService {
  private readonly logger = new Logger('BtdwanAttendance');
  // constructor() {}

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.log('45');
    console.log(45);
  }
}
