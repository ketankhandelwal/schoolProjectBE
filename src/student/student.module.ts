import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '../auth/jwt.strategy';

import { jwtConstants } from '../auth/constants';

import { PrismaService } from '../prisma.service';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';


@Module({
  controllers: [StudentController],
  imports: [
   
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_LIMIT },
    }),
  ],
  providers: [StudentService, JwtStrategy,PrismaService],
  exports: [StudentService],
})
export class StudentModule {}
