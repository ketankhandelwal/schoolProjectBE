import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

import { jwtConstants } from './constants';

import { PrismaService } from '../prisma.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
   
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_LIMIT },
    }),
  ],
  providers: [AuthService, JwtStrategy,PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
