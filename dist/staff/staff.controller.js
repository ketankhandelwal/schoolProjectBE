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
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../constants");
const roles_guard_1 = require("../roleguard/roles.guard");
const staff_create_dto_1 = require("./dto/staff.create.dto");
const staff_delete_dto_1 = require("./dto/staff.delete.dto");
const staff_leaves_dto_1 = require("./dto/staff.leaves.dto");
const staff_update_dto_1 = require("./dto/staff.update.dto");
const staff_service_1 = require("./staff.service");
let StaffController = class StaffController {
    constructor(staffService) {
        this.staffService = staffService;
    }
    async findAll(page, count, search, gender, subject, role, start_date, end_date, order_by) {
        let data = {};
        data.searchData = {
            where: {
                status: constants_1.NUMBER.one
            },
        };
        if (gender) {
            data.searchData.where.gender = Number(gender);
        }
        if (subject) {
            data.searchData.where.subject = String(subject);
        }
        if (role) {
            data.searchData.where.role = Number(role);
        }
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
        data.order_by = order_by;
        data.page = page;
        data.count = count;
        if (search) {
            data.searchData.where.OR = [
                {
                    name: {
                        contains: search,
                    },
                }
            ];
        }
        return this.staffService.findAll(data).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async addStudent(data, req) {
        return this.staffService.addStaffDetails(req.user.userDetails.userData, data).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async updateStudent(data, req) {
        console.log(data);
        return this.staffService.updateStaffDetails(req.user.userDetails.userData, data).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getStudentDetails(id) {
        return this.staffService.getStaffDetails(id).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deleteStudent(data) {
        return this.staffService.deleteStaff(data).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async saveStudentFee(data, req) {
        console.log(data);
        return this.staffService.saveStaffLeaves(data, req.user.userDetails.userData).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getStaffLeavesDetails(id, month, year, leave_type, req) {
        console.log((id));
        console.log(month);
        let data = {};
        data.searchData = {
            where: {
                status: constants_1.NUMBER.one,
                staff_id: Number(id)
            },
        };
        if (leave_type) {
            data.searchData.where.leave_type = Number(leave_type);
        }
        if (month) {
            data.searchData.where.leave_from = {
                lte: new Date(`${new Date().getFullYear()}-${Number(month) + 1}-1`),
                gte: new Date(`${new Date().getFullYear()}-${month}-1`)
            };
        }
        if (year) {
            data.searchData.where.leave_from = {
                lte: new Date(`${Number(year) + 1}-${1}-1`),
                gte: new Date(`${year}-${1}-1`)
            };
        }
        if (year && month) {
            data.searchData.where.leave_from = {
                lte: new Date(`${year}-${Number(month) + 1}-1`),
                gte: new Date(`${year}-${month}-1`)
            };
        }
        return this.staffService.getStaffLeaveDetails(data).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.SetMetadata)("roles", [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, swagger_1.ApiQuery)({ name: "search", required: false }),
    (0, swagger_1.ApiQuery)({ name: "gender", required: false }),
    (0, swagger_1.ApiQuery)({ name: "subject", required: false }),
    (0, swagger_1.ApiQuery)({ name: "role", required: false }),
    (0, swagger_1.ApiQuery)({ name: "start_date", required: false }),
    (0, swagger_1.ApiQuery)({ name: "end_date", required: false }),
    (0, swagger_1.ApiQuery)({
        name: "order_by",
        required: false,
    }),
    (0, common_1.Get)('findAll'),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("count")),
    __param(2, (0, common_1.Query)("search")),
    __param(3, (0, common_1.Query)("gender")),
    __param(4, (0, common_1.Query)('subject')),
    __param(5, (0, common_1.Query)('role')),
    __param(6, (0, common_1.Query)("start_date")),
    __param(7, (0, common_1.Query)("end_date")),
    __param(8, (0, common_1.Query)("order_by")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number, String, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Post)('addStaff'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_create_dto_1.CREATESTAFFDTO, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "addStudent", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Post)('updateStaff'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_update_dto_1.UPDATESTAFFDTO, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Get)('staffDetails/:id'),
    (0, swagger_1.ApiParam)({
        name: "id", required: true
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStudentDetails", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin]),
    (0, common_1.Post)('deleteStaff'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_delete_dto_1.DELETESTAFFDTO]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "deleteStudent", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Post)('saveStaffLeaves'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_leaves_dto_1.ADDSTAFFLEAVESDTO, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "saveStudentFee", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Get)('getStaffLeavesDetails'),
    (0, swagger_1.ApiQuery)({ name: "id", required: false }),
    (0, swagger_1.ApiQuery)({ name: "year", required: false }),
    (0, swagger_1.ApiQuery)({ name: "month", required: false }),
    (0, swagger_1.ApiQuery)({ name: "leave_type", required: false }),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __param(3, (0, common_1.Query)('leave_type')),
    __param(4, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStaffLeavesDetails", null);
StaffController = __decorate([
    (0, common_1.Controller)('staff'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffController);
exports.StaffController = StaffController;
//# sourceMappingURL=staff.controller.js.map