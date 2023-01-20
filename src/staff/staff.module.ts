import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '../auth/jwt.strategy';

import { jwtConstants } from '../auth/constants';

import { PrismaService } from '../prisma.service';
import { StaffController } from '../staff/staff.controller';
import { StaffService } from '../staff/staff.service';


@Module({
  controllers: [StaffController],
  imports: [
   
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_LIMIT },
    }),
  ],
  providers: [StaffService, JwtStrategy,PrismaService],
  exports: [StaffService],
})
export class StaffModule {}
