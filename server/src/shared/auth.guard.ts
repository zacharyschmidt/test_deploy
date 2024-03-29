import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { verify } from 'jsonwebtoken';

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) return false;

    request.user = await this.verifyToken(request.headers.authorization);
    return true;
  };

  private verifyToken = async (auth: string) => {
    const authHeader = auth.split(' ');
    if (authHeader[0] !== 'Bearer') {
      throw new HttpException('Unauthorized token', HttpStatus.UNAUTHORIZED);
    }
    try {
      const token = authHeader[1];
      const decode = await verify(token, process.env.SECRET);
      return decode;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  };
}
