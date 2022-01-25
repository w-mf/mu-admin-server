import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FindAccountDto } from './dto/find-account.dto';
import { SetPasswordAccountDto } from './dto/setpassword-account.dto';
@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const hasName = await this.accountRepository.findOne({
      where: { name: createAccountDto.name },
    });
    if (hasName) {
      throw new ConflictException(`“${createAccountDto.name}”已存在`);
    }
    const account: Account = this.accountRepository.create(createAccountDto);
    const res = await this.accountRepository.save(account);
    return res;
  }

  async findAll(findAccountDto: FindAccountDto) {
    const { pageNo, pageSize } = findAccountDto;
    const [accounts, total] = await this.accountRepository.findAndCount({
      order: {
        id: 'ASC',
      },
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
    });
    return {
      total,
      pageNo,
      pageSize,
      list: accounts,
    };
  }

  async findOne(id: number) {
    const res = await this.accountRepository.findOne(id);
    if (!res || Object.keys(res).length === 0) {
      throw new BadRequestException('查找的资源不存在');
    }
    delete res.password;
    return res;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    await this.findOne(id);
    await this.accountRepository.update(id, updateAccountDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.accountRepository.delete(id);
    return true;
  }
  async setPassword(setPasswordAccountDto: SetPasswordAccountDto) {
    return await this.update(setPasswordAccountDto.id, {
      password: setPasswordAccountDto.password,
    });
  }
}
