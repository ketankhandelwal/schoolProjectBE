import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '../auth/jwt.strategy';


import { jwtConstants } from '../auth/constants';

import { PrismaService } from '../prisma.service';
import { AccountController } from './accounts.controller';
import { AccountService } from './accounts.service';


@Module({
  controllers: [AccountController],
  imports: [
   
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_LIMIT },
    }),
  ],
  providers: [AccountService, JwtStrategy,PrismaService],
  exports: [AccountService],
})
export class AccountModule {}
