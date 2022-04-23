import { ScheduleModule as schedule } from '@nestjs/schedule';

export function ScheduleModule() {
  return schedule.forRoot();
}
