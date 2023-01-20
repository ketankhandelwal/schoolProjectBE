"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const constants_1 = require("../auth/constants");
const prisma_service_1 = require("../prisma.service");
const staff_controller_1 = require("../staff/staff.controller");
const staff_service_1 = require("../staff/staff.service");
let StaffModule = class StaffModule {
};
StaffModule = __decorate([
    (0, common_1.Module)({
        controllers: [staff_controller_1.StaffController],
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: process.env.JWT_EXPIRE_LIMIT },
            }),
        ],
        providers: [staff_service_1.StaffService, jwt_strategy_1.JwtStrategy, prisma_service_1.PrismaService],
        exports: [staff_service_1.StaffService],
    })
], StaffModule);
exports.StaffModule = StaffModule;
//# sourceMappingURL=staff.module.js.map