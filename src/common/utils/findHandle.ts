import * as dayjs from 'dayjs';
import { ILike } from 'typeorm';

/**
 * 数据库find 日期处理函数
 * @param date - 日期
 * @param isStart - 是否是开始时间。如果为false 则补充时分秒=23/59，反之为0
 */
export function findDateFill(date: Date | undefined, isStart = true) {
  const d = date ? dayjs(date) : dayjs();
  return d
    .set('hour', isStart ? 0 : 23)
    .set('minute', isStart ? 0 : 59)
    .set('second', isStart ? 0 : 59)
    .toDate();
}

/**
 * 数据库find where处理函数
 * @param original - where原始值
 * @param accurateField - 精确搜索的字段集合，（其他为模糊搜索）
 */
export function whereHandle(original: object = {}, accurateField: string[] = []) {
  const where = original;
  Object.keys(where).forEach((key) => {
    if (typeof where[key] === 'undefined') delete where[key];
    else if (!accurateField.includes(key)) {
      // 处理状态其他字段模糊查询
      where[key] = ILike('%' + where[key] + '%');
    }
  });
  return where;
}
