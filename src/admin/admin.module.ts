import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '../auth/jwt.strategy';
import { AdminService } from './admin.service';

import { jwtConstants } from '../auth/constants';

import { PrismaService } from '../prisma.service';
import { AdminController } from '../admin/admin.controller';

@Module({
  controllers: [AdminController],
  imports: [
   
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_LIMIT },
    }),
  ],
  providers: [AdminService, JwtStrategy,PrismaService],
  exports: [AdminService],
})
export class AdminModule {}
