import * as dayjs from 'dayjs';

export function findDateFill(date: Date | undefined, isStart = true) {
  const d = date ? dayjs(date) : dayjs();
  return d
    .set('hour', isStart ? 0 : 23)
    .set('minute', isStart ? 0 : 59)
    .set('second', isStart ? 0 : 59)
    .toDate();
}
