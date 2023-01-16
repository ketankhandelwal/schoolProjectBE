"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const constants_1 = require("../auth/constants");
const prisma_service_1 = require("../prisma.service");
const student_controller_1 = require("./student.controller");
const student_service_1 = require("./student.service");
let StudentModule = class StudentModule {
};
StudentModule = __decorate([
    (0, common_1.Module)({
        controllers: [student_controller_1.StudentController],
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: process.env.JWT_EXPIRE_LIMIT },
            }),
        ],
        providers: [student_service_1.StudentService, jwt_strategy_1.JwtStrategy, prisma_service_1.PrismaService],
        exports: [student_service_1.StudentService],
    })
], StudentModule);
exports.StudentModule = StudentModule;
//# sourceMappingURL=student.module.js.map