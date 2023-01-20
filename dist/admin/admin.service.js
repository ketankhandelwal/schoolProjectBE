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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
const message_1 = require("../message");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let AdminService = class AdminService {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async createSubAdmin(payload, data) {
        data.created_by = payload.id;
        data.updated_by = payload.id;
        await this.prisma.admin.create({ data: data });
        return true;
    }
    async updateSubAdminDetails(payload, data) {
        data.updated_by = payload.id;
        await this.prisma.admin.update({
            data: data,
            where: {
                id: Number(data.id),
            },
        });
        return true;
    }
    async getAdminDetails(id) {
        const data = await this.prisma.admin.findUnique({
            where: {
                id: Number(id)
            }
        });
        console.log(data);
        delete data.password;
        return {
            res: data
        };
    }
    async getSubAdminDetails(id) {
        const data = await this.prisma.admin.findUnique({
            where: {
                id: Number(id),
            },
        });
        delete data.password;
        return {
            res: data,
        };
    }
    async deleteSubAdmin(id) {
        await this.prisma.admin.update({
            data: {
                status: constants_1.STATUS.delete
            },
            where: {
                id: Number(id)
            }
        });
        return true;
    }
    async update(id, request) {
        return this.prisma.admin.updateMany({
            data: Object.assign(Object.assign({}, request), { id: undefined }),
            where: {
                id,
            },
        });
    }
    async findById(AdminWhereUniqueInput) {
        const response = await this.prisma.admin.findUnique({
            where: AdminWhereUniqueInput,
        });
        return response;
    }
    async changePassword(user, userDetails) {
        if (userDetails && userDetails["userDetails"]) {
            let userDetailsValue = await this.findById({
                id: userDetails["userDetails"]["userData"]["id"],
            });
            console.log(userDetailsValue);
            let matchPassword = await bcrypt.compare(user.old_password, userDetailsValue.password);
            console.log(matchPassword);
            if (!matchPassword) {
                throw new common_1.HttpException({ message: message_1.MESSAGE.oldPasswordNotMatch }, common_1.HttpStatus.BAD_REQUEST);
            }
            let password = await bcrypt.hash(user.new_password, parseInt(process.env.HASH_SALT_ROUNDS));
            let adminUpdateData = {
                created_by: constants_1.NUMBER.zero,
                updated_by: constants_1.NUMBER.zero,
                updated_at: new Date(),
                password: password,
            };
            if (this.update(userDetailsValue.id, adminUpdateData)) {
                return { message: message_1.MESSAGE.resetPasswordSuccess };
            }
        }
        else {
            throw new common_1.HttpException({ message: message_1.MESSAGE.userNotExists }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateAdmin(reqData, id) {
        return this.prisma.admin.updateMany({
            data: reqData,
            where: {
                id,
            },
        });
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, prisma_service_1.PrismaService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map