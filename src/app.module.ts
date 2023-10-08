import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { APP_INTERCEPTOR, APP_GUARD } from "@nestjs/core";
import { TransformInterceptor } from "./interceptor/transform.interceptor";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { DateCheckMiddleware } from "./date-check/date-check.middleware"; // Import your middleware

import { AuthModule } from "./auth/auth.module";
import { StudentModule } from "./student/student.module";
import { StaffModule } from "./staff/staff.module";
import { AdminModule } from "./admin/admin.module";
import { SubadminpermissionModule } from "./subadminpermission/subadminpermission.module";
import { AccountModule } from "./accounts/accounts.module";

@Module({
  imports: [
    AuthModule,
    StudentModule,
    StaffModule,
    AdminModule,
    SubadminpermissionModule,
    AccountModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DateCheckMiddleware).forRoutes("*"); // Apply your middleware to all routes
  }
}
