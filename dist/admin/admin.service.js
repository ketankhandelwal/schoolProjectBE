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
const prisma_service_1 = require("../prisma.service");
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
    async getSubAdminDetails(id) {
        const data = await this.prisma.admin.findUnique({
            where: {
                id: Number(id),
            },
        });
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
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, prisma_service_1.PrismaService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map