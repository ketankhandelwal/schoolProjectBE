"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const core_2 = require("@nestjs/core");
const transform_interceptor_1 = require("./interceptor/transform.interceptor");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const auth_module_1 = require("./auth/auth.module");
const student_module_1 = require("./student/student.module");
const staff_module_1 = require("./staff/staff.module");
const admin_module_1 = require("./admin/admin.module");
const subadminpermission_module_1 = require("./subadminpermission/subadminpermission.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, student_module_1.StudentModule, staff_module_1.StaffModule, admin_module_1.AdminModule, subadminpermission_module_1.SubadminpermissionModule],
        controllers: [],
        providers: [{
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
            {
                provide: core_2.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard
            }],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map