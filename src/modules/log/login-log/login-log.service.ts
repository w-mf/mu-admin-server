import { Injectable } from '@nestjs/common';
import { CreateLoginLogDto } from './dto/create-login-log.dto';
import { FindLoginLogDto } from './dto/find-login-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { LoginLogEntity } from '~/modules/log/login-log/entities/login-log.entity';
import * as dayjs from 'dayjs';
import { findDateFill, whereHandle } from '~/common/utils/findHandle';
@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLogEntity)
    private readonly loginLogRepository: Repository<LoginLogEntity>,
  ) {}

  async create(createLoginLogDto: CreateLoginLogDto) {
    const log: LoginLogEntity = this.loginLogRepository.create(createLoginLogDto);
    return await this.loginLogRepository.save(log);
  }

  async findAll(findLoginLogDto: FindLoginLogDto) {
    const {
      pageNo,
      pageSize,
      userName,
      status,
      startDate = dayjs().subtract(7, 'days').set('hour', 0).set('minute', 0).set('second', 0).toDate(),
      endDate = dayjs().set('hour', 23).set('minute', 59).set('second', 59).toDate(),
    } = findLoginLogDto;
    const dateBetween = Between(findDateFill(startDate, true), findDateFill(endDate, false));
    const where = whereHandle({ createdAt: dateBetween, userName, status }, ['createdAt', 'status']);

    const [list, total] = await this.loginLogRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      where,
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
    });
    return {
      total,
      pageNo,
      pageSize,
      list,
    };
  }
}
