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
exports.SubadminpermissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let SubadminpermissionService = class SubadminpermissionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.subAdminPermission.create({
            data,
        });
    }
    async findById(SubAdminPermissionWhereUniqueInput) {
        const response = await this.prisma.subAdminPermission.findUnique({
            where: SubAdminPermissionWhereUniqueInput,
        });
        return this.convertBigintToString(response);
    }
    async delete(request) {
        const response = await this.prisma.subAdminPermission.deleteMany(request);
        return response;
    }
    async update(id, request) {
        return await this.prisma.subAdminPermission.updateMany({
            data: Object.assign(Object.assign({}, request), { id: undefined }),
            where: {
                id,
            },
        });
    }
    async updateMany(request) {
        const response = await this.prisma.subAdminPermission.updateMany(request);
        return response;
    }
    async findAll() {
        const values = await this.prisma.permission.findMany({
            where: {
                status: 1
            }
        });
        return { "res": values };
    }
    async findMany(data) {
        const response = await this.prisma.subAdminPermission.findMany({
            where: data
        });
        return response;
    }
    convertBigintToString(obj) {
        for (const key in obj) {
            if (typeof (obj[key]) == 'bigint') {
                obj[key] = obj[key].toString();
            }
            for (const prop in obj[key]) {
                if (typeof (obj[key][prop]) == 'object') {
                    this.convertBigintToString(obj[key]);
                }
                else {
                    if (typeof (obj[key][prop]) == 'bigint') {
                        obj[key][prop] = obj[key][prop].toString();
                    }
                }
            }
        }
        return obj;
    }
};
SubadminpermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubadminpermissionService);
exports.SubadminpermissionService = SubadminpermissionService;
//# sourceMappingURL=subadminpermission.service.js.map