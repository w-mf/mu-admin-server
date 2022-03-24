import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();
      const authorization = req.headers.authorization || '';
      const token = authorization.split(' ').length > 1 ? authorization.split(' ')[1] : null;

      const obj = this.jwtService.verify(token);
      // token时间过半，则返回true, 通过header提醒客户端刷新token
      const isRefresh = dayjs.unix(obj.exp).unix() - dayjs().unix() < (obj.exp - obj.iat) / 2;
      res.setHeader('refresh-token', isRefresh);
    } catch (e) {}

    return this.activate(context);
  }
  async activate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }
}
