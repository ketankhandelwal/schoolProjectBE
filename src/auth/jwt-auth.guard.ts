import { ExecutionContext,
  Injectable,
  UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OPEN_API_PATH } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {


  canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      if (OPEN_API_PATH.indexOf(request.route.path) > -1) {
          return true
      } else {
          return super.canActivate(context);
      }
    }

    handleRequest(err, user, info) {
       
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      return user;
    }
    // getRequest(context: ExecutionContext) {
    //   const request = context.switchToHttp().getRequest();
    //   request.userIds = 'user_123456789';
    //   request.body['userIds'] = 'user_123456789';
    //   return {
    //     headers: {
    //       authorizations: 'user_123456789',
    //     }
    //   }
    // }
}
