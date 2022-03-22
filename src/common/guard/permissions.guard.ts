import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_DATA } from '~/common/constants/metadata.constant';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(META_DATA.ACCESS_CODE, context.getHandler());
    // 没有配置permissions装饰器，默认不进行权限校验
    if (!permissions) return true;
    const req = context.switchToHttp().getRequest();
    const { permissions: userPermissions, isAdmin } = req.user;
    if (isAdmin) return true;
    if (!userPermissions && userPermissions.length === 0) throw new ForbiddenException('暂无权限访问，请联系管理员');
    if (permissions.some((item) => userPermissions.includes(item))) {
      return Promise.resolve(true);
    } else {
      throw new ForbiddenException('暂无权限访问，请联系管理员');
    }
  }
}
