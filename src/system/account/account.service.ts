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
import { MenuService } from '~/system/menu/menu.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AccountService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly roleService: RoleService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly menuService: MenuService,
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
      account.roles = await this.roleService.findIds(createAccountDto.roleIds);
    }
    //创建新用户的默认密码
    account.password = await this.authService.encryption({ str: this.configService.get('createAccountPass') });
    const res = await this.accountRepository.save(account);
    return await this.findOne(res.id);
  }

  async findAll(findAccountDto: FindAccountDto) {
    const { pageNo, pageSize } = findAccountDto;
    const [accounts, total] = await this.accountRepository.findAndCount({
      relations: ['roles'],
      order: {
        id: 'ASC',
      },
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
    });
    const list = accounts.map((item) => ({
      ...item,
      roles: undefined,
      roleList: item.roles.map((i) => ({ id: i.id, name: i.name })),
    }));
    return {
      total,
      pageNo,
      pageSize,
      list,
    };
  }

  // isFindAll 是否查找包括select=false的字段
  async findOne(id: number, isFindAll = false) {
    let account;
    if (isFindAll) {
      const queryBuilder = this.accountRepository.createQueryBuilder('account');
      account = await queryBuilder.select().where('account.id = :id', { id }).addSelect('account.password').getOne();
    } else {
      account = await this.accountRepository.findOne(id, {
        relations: ['roles'],
      });
    }
    if (!account || Object.keys(account).length === 0) {
      throw new PreconditionFailedException('查找的资源不存在');
    }
    return {
      ...account,
      roles: undefined,
      roleList: account.roles.map((item) => ({ id: item.id, name: item.name })),
    };
  }

  // 查找用户，使用userName 或 id
  async findAccount(obj: { userName?: string; id?: number }, isFindAll = false) {
    const queryBuilder = this.accountRepository.createQueryBuilder('account');
    const select = await queryBuilder.select();
    Object.keys(obj).forEach((key, index) => {
      if (index === 0) select.where(`account.${key} = :${key}`, { [key]: obj[key] });
      else select.andWhere(`account.${key} = :${key}`, { [key]: obj[key] });
    });
    if (isFindAll) {
      return await select.addSelect('account.password').getOne();
    }
    return await select.getOne();
  }
  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);
    if (updateAccountDto.roleIds) {
      account.roles = await this.roleService.findIds(updateAccountDto.roleIds);
    }
    //  筛查修改的用户名是否已经存在
    const hasName = await this.accountRepository.findOne({
      where: { userName: updateAccountDto.userName, id: Not(id) },
    });
    if (hasName) {
      throw new PreconditionFailedException(`“${updateAccountDto.userName}”已存在`);
    }
    await this.accountRepository.save(Object.assign(account, updateAccountDto));
    return true;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.accountRepository.softDelete(id);
    return true;
  }

  async resetPassword(id: number, password: string | undefined) {
    await this.findOne(id);
    await this.accountRepository.update(id, {
      password: password || this.configService.get('createAccountPass'),
    });
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

  // 是否校验menuIds = all 的菜单
  async getPermissions(id, isCheckAll = true) {
    const account = await this.accountRepository.findOne({ where: { id }, relations: ['roles'] });
    const menuIds = [];
    account.roles.forEach((item) => {
      if (item.menuIds) menuIds.push(...item.menuIds.split(','));
    });
    let menus;
    if (menuIds.includes('all')) {
      if (!isCheckAll) return 'all';
      menus = await this.menuService.findAll(false);
    } else menus = await this.menuService.findIds(menuIds);
    return menus.map((item) => item.accessCode).filter((item) => item);
  }
}
