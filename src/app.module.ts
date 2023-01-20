import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { APP_GUARD } from '@nestjs/core';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { StaffModule } from './staff/staff.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [AuthModule, StudentModule, StaffModule,AdminModule],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
