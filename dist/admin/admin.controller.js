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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../constants");
const roles_guard_1 = require("../roleguard/roles.guard");
const admin_service_1 = require("./admin.service");
const admin_changePassword_dto_1 = require("./dto/admin.changePassword.dto");
const admin_create_subAdmin_dto_1 = require("./dto/admin.create.subAdmin.dto");
const admin_update_dto_1 = require("./dto/admin.update.dto");
const admin_update_subAdmin_dto_1 = require("./dto/admin.update.subAdmin.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async createSubAdmin(data, req) {
        return this.adminService.createSubAdmin(req.user.userDetails.userData, data).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async updateSubAdmin(data, req) {
        return this.adminService.updateSubAdminDetails(req.user.userDetails.userData, data).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getStudentDetails(id) {
        return this.adminService.getSubAdminDetails(id).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deleteStudent(id) {
        return this.adminService.deleteSubAdmin(Number(id)).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getAdminDetails(req) {
        console.log(req.user.userDetails.userData.id);
        return this.adminService.getAdminDetails(req.user.userDetails.userData.id).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async adminChangePassword(data, req) {
        return this.adminService.changePassword(data, req.user).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async update(data, req) {
        return this.adminService
            .updateAdmin(data, Number(req.user.userDetails.userData.id))
            .catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getSubAdminList(page, count, search, start_date, end_date, req) {
        let data = {};
        data.searchData = {
            where: {
                role: constants_1.ROLE_ENUM.subAdmin,
                status: constants_1.STATUS.active
            },
        };
        if (start_date || end_date) {
            if (start_date) {
                start_date += " 00:00:00";
            }
            else {
                start_date = constants_1.START_DATE;
            }
            if (end_date) {
                end_date += " 23:59:59";
            }
            else {
                let current_date = new Date();
                end_date = current_date.toISOString().split("T")[0] + " 23:59:59";
            }
            data.searchData.where.created_at = {
                lte: new Date(end_date),
                gte: new Date(start_date),
            };
        }
        data.page = page;
        data.count = count;
        if (search) {
            data.searchData.where.OR = [
                {
                    name: {
                        contains: search,
                    },
                },
                {
                    email: {
                        contains: search,
                    },
                },
            ];
        }
        data.orderBy = {
            id: "desc",
        };
        return this.adminService.getSubAdminList(data, req.user.userDetails.userData.id);
    }
    async getPermissionList(id, req) {
        return this.adminService.getPermissionList(id).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Post)('createSubAdmin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_create_subAdmin_dto_1.CREATESUBADMINDTO, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createSubAdmin", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Post)('updateSubAdmin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_subAdmin_dto_1.UPDATESUBADMINDTO, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateSubAdmin", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Get)('subAdminDetails'),
    (0, swagger_1.ApiQuery)({
        name: "id", required: true
    }),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStudentDetails", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin]),
    (0, common_1.Post)('deleteSubAdmin'),
    (0, swagger_1.ApiQuery)({ name: "id", required: true }),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteStudent", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Get)('adminDetails'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminDetails", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.SetMetadata)("roles", [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        type: admin_changePassword_dto_1.UpdateAdminChangePasswordDto,
    }),
    (0, common_1.Post)("adminChangePassword"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_changePassword_dto_1.UpdateAdminChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminChangePassword", null);
__decorate([
    (0, common_1.Post)("update"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_dto_1.UpdateAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.SetMetadata)("roles", [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Get)("getSubAdminList"),
    (0, swagger_1.ApiQuery)({ name: "start_date", required: false }),
    (0, swagger_1.ApiQuery)({ name: "end_date", required: false }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("count")),
    __param(2, (0, common_1.Query)("search")),
    __param(3, (0, common_1.Query)("start_date")),
    __param(4, (0, common_1.Query)("end_date")),
    __param(5, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSubAdminList", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.SetMetadata)("roles", [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Get)("getPermissionList/:id"),
    (0, swagger_1.ApiParam)({ name: "id", required: true }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPermissionList", null);
AdminController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map