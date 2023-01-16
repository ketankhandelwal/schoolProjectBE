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
const admin_create_subAdmin_dto_1 = require("./dto/admin.create.subAdmin.dto");
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
};
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin]),
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
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin]),
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
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin]),
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
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map