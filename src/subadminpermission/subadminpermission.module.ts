import { Module } from '@nestjs/common';
import { SubadminpermissionService } from './subadminpermission.service';
import { SubadminpermissionController } from './subadminpermission.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './../auth/constants'

@Module({
  providers: [SubadminpermissionService,PrismaService],
  controllers: [SubadminpermissionController],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_LIMIT },
    }),
  ]
})
export class SubadminpermissionModule {}
