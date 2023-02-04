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
exports.SubadminpermissionController = void 0;
const common_1 = require("@nestjs/common");
const subadminpermission_service_1 = require("./subadminpermission.service");
const subadminpermission_update_dto_1 = require("./dto/subadminpermission.update.dto");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("./../roleguard/roles.guard");
const constants_1 = require("../constants");
let SubadminpermissionController = class SubadminpermissionController {
    constructor(subadminpermissionService) {
        this.subadminpermissionService = subadminpermissionService;
    }
    async finadAll() {
        return this.subadminpermissionService.findAll().catch(err => {
            throw new common_1.HttpException({
                message: err.message
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getById(id) {
        return this.subadminpermissionService.findById({ id: Number(id) });
    }
    async create(data) {
        return this.subadminpermissionService.create(data).catch(err => {
            throw new common_1.HttpException({
                message: err.message
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deletePost(request) {
        return this.subadminpermissionService.delete(request).catch(err => {
            throw new common_1.HttpException({
                message: err.message
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async update(id, request) {
        return this.subadminpermissionService.update(Number(id), request).catch(err => {
            throw new common_1.HttpException({
                message: err.message
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async updateMany(request) {
        return this.subadminpermissionService.updateMany(request).catch(err => {
            throw new common_1.HttpException({
                message: err.message
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Get)('permissionsList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubadminpermissionController.prototype, "finadAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubadminpermissionController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubadminpermissionController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubadminpermissionController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number,
        subadminpermission_update_dto_1.UpdateSubadminpermissionDto]),
    __metadata("design:returntype", Promise)
], SubadminpermissionController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubadminpermissionController.prototype, "updateMany", null);
SubadminpermissionController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('subadminpermission'),
    __metadata("design:paramtypes", [subadminpermission_service_1.SubadminpermissionService])
], SubadminpermissionController);
exports.SubadminpermissionController = SubadminpermissionController;
//# sourceMappingURL=subadminpermission.controller.js.map