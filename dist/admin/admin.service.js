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
const helper_function_1 = require("../helper.function");
const message_1 = require("../message");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let generator = require("generate-password");
let AdminService = class AdminService {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async createSubAdmin(payload, data) {
        let emailCheck = await this.prisma.admin.findFirst({
            where: {
                email: data.email,
            },
        });
        if (emailCheck && emailCheck.id) {
            throw new common_1.HttpException({ message: message_1.MESSAGE.userAlreadyExists }, common_1.HttpStatus.BAD_REQUEST);
        }
        let hashPassword = await bcrypt.hash(data.password, parseInt(process.env.HASH_SALT_ROUNDS));
        let createSubAdminData = {
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            password: hashPassword,
            role: data.role,
            designation: data.designation,
            profile_photo: data.profile_photo,
            created_by: Number(payload.id),
            updated_by: Number(payload.id),
        };
        let finalData = await this.prisma.admin.create({
            data: createSubAdminData,
        });
        for (let key of data.permission) {
            let createSubAdminPermissionData = {
                sub_admin_id: Number(finalData.id),
                permission_id: Number(key.id),
                status: Number(key.status),
                created_by: Number(payload.id),
                updated_by: Number(payload.id),
            };
            await this.prisma.subAdminPermission.create({
                data: createSubAdminPermissionData,
            });
        }
        return { res: finalData };
    }
    async updateSubAdminDetails(payloadData, reqData) {
        const adminData = {};
        adminData.name = reqData.name;
        adminData.phone_number = reqData.phone_number;
        adminData.profile_photo = reqData.profile_photo;
        adminData.updated_at = new Date();
        adminData.updated_by = payloadData.id;
        adminData.designation = reqData.designation;
        const subAdminData = {};
        subAdminData.permission = reqData.permission;
        await this.prisma.admin.update({
            data: adminData,
            where: {
                id: Number(reqData.id),
            },
        });
        const countSubAdminPermissions = await this.prisma.subAdminPermission.count({
            where: {
                sub_admin_id: Number(reqData.id),
            },
        });
        if (countSubAdminPermissions < constants_1.TOTAL_PERMISSIONS.total_subadmin_permissions) {
            for (let i = countSubAdminPermissions + 1; i <= constants_1.TOTAL_PERMISSIONS.total_subadmin_permissions; i++) {
                const newSubAdminData = {
                    sub_admin_id: reqData.id,
                    permission_id: i,
                    status: constants_1.STATUS.inactive,
                    created_by: payloadData.id,
                    updated_by: payloadData.id,
                };
                await this.prisma.subAdminPermission.create({
                    data: newSubAdminData,
                });
            }
        }
        await subAdminData.permission.forEach(async (elements) => {
            await this.prisma.subAdminPermission.updateMany({
                data: {
                    status: elements.status,
                    updated_at: new Date(),
                },
                where: {
                    sub_admin_id: Number(reqData.id),
                    permission_id: elements.permission_id,
                },
            });
        });
        const adminUser = await this.prisma.admin.findUnique({
            where: {
                id: Number(reqData.id),
            },
        });
        delete adminUser.password;
        return {
            res: {
                userDeatils: adminUser,
                permission: await this.prisma.subAdminPermission.findMany({
                    where: {
                        sub_admin_id: Number(reqData.id),
                    },
                }),
                messgae: "Admin Updated",
            },
        };
    }
    async getAdminDetails(id) {
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
    async getSubAdminDetails(id) {
        const data = await this.prisma.admin.findUnique({
            where: {
                id: Number(id),
            },
        });
        delete data.password;
        data.permissions = await this.prisma.subAdminPermission.findMany({
            where: {
                sub_admin_id: Number(id),
            },
        });
        return {
            res: data,
        };
    }
    async deleteSubAdmin(id) {
        await this.prisma.admin.update({
            data: {
                status: constants_1.STATUS.delete,
            },
            where: {
                id: Number(id)
            },
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
            let matchPassword = await bcrypt.compare(user.old_password, userDetailsValue.password);
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
    async getSubAdminList(data, request) {
        const [offset, limit] = await (0, helper_function_1.pagination)(data.page, data.count);
        const countData = await this.prisma.admin.count(data.searchData);
        data.searchData.skip = offset;
        data.searchData.take = limit;
        let response = await this.prisma.admin.findMany(data.searchData);
        const finalData = { count: countData, finalData: response };
        return { res: finalData };
    }
    async getPermissionList(id) {
        const newAdmin = {};
        newAdmin.permission = await this.prisma.subAdminPermission.findMany({
            where: {
                sub_admin_id: Number(id),
            },
        });
        return {
            res: {
                subAdminPermission: newAdmin.permission,
            },
        };
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, prisma_service_1.PrismaService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map