import { Injectable, BadRequestException, PreconditionFailedException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FindAccountDto } from './dto/find-account.dto';
import { SetPasswordAccountDto } from './dto/setpassword-account.dto';
import { RoleService } from '~/system/role/role.service';
import { AuthService } from '~/auth/auth.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    private readonly roleService: RoleService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const hasName = await this.accountRepository.findOne({
      where: { userName: createAccountDto.userName },
    });
    if (hasName) {
      throw new PreconditionFailedException(`“${createAccountDto.userName}”已存在`);
    }
    const account: AccountEntity = this.accountRepository.create(createAccountDto);

    if (createAccountDto.roleIds) {
      const ids = createAccountDto.roleIds.split(',').map((item) => +item);
      account.roles = await this.roleService.findIds(ids);
    }
    //创建新用户的默认密码
    account.password = await this.authService.encryption({ str: '123456' });
    const res = await this.accountRepository.save(account);
    return await this.findOne(res.id);
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

  // isFindAll 是否查找包括select=false的字段
  async findOne(id: number, isFindAll = false) {
    let account;
    if (isFindAll) {
      const queryBuilder = this.accountRepository.createQueryBuilder('account');
      account = await queryBuilder.select().where('account.id = :id', { id }).addSelect('account.password').getOne();
    } else {
      account = await this.accountRepository.findOne(id);
    }
    if (!account || Object.keys(account).length === 0) {
      throw new PreconditionFailedException('查找的资源不存在');
    }
    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id, true);

    if (updateAccountDto.roleIds) {
      const ids = updateAccountDto.roleIds.split(',').map((item) => +item);
      account.roles = await this.roleService.findIds(ids);
    }
    //  筛查修改的用户名是否已经存在
    const hasName = await this.accountRepository.findOne({
      where: { userName: updateAccountDto.userName, id: Not(id) },
    });
    if (hasName) {
      throw new PreconditionFailedException(`“${updateAccountDto.userName}”已存在`);
    }

    const res = await this.accountRepository.save(Object.assign(account, updateAccountDto));
    return this.accountRepository.findOne(res.id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.accountRepository.softDelete(id);
    return true;
  }

  async setPassword(id: number, setPasswordAccountDto: SetPasswordAccountDto) {
    const account = await this.findOne(id, true);
    if (account.password !== setPasswordAccountDto.oldPassword) throw new BadRequestException('旧密码不正常');
    await this.accountRepository.update(id, {
      password: setPasswordAccountDto.newPassword,
    });
    return true;
  }
}
