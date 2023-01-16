"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const message_1 = require("../message");
const constants_1 = require("../constants");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async validateAdmin(data) {
        const admin = await this.prisma.admin.findFirst({
            where: {
                email: data.email,
                status: data.status,
                role: data.role
            }
        });
        if (admin) {
            return admin;
        }
        return null;
    }
    async adminLogin(user, role) {
        var userDetails = {};
        let loginData = {
            email: user.email,
            status: constants_1.STATUS.active,
            role: role,
        };
        userDetails = await this.validateAdmin(loginData);
        if (userDetails) {
            const userDetailsValue = userDetails;
            if (userDetailsValue.status != 1) {
                throw new common_1.HttpException({ message: message_1.MESSAGE.userInactiveOrDeleteByAdmin }, common_1.HttpStatus.BAD_REQUEST);
            }
            let matchPassword = await bcrypt.compare(user.password, userDetailsValue.password);
            if (!matchPassword) {
                throw new common_1.HttpException({ message: message_1.MESSAGE.passwordNotMatch }, common_1.HttpStatus.BAD_REQUEST);
            }
            delete userDetailsValue.password;
            const payload = { userData: userDetailsValue };
            return {
                res: {
                    user_details: userDetailsValue,
                    access_token: this.jwtService.sign(payload),
                },
            };
        }
        else {
            throw new common_1.HttpException({ message: message_1.MESSAGE.invalidEmail }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map