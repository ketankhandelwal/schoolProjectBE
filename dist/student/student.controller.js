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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../constants");
const roles_guard_1 = require("../roleguard/roles.guard");
const student_addBulkFees_dto_1 = require("./dto/student.addBulkFees.dto");
const student_addFee_dto_1 = require("./dto/student.addFee.dto");
const student_create_dto_1 = require("./dto/student.create.dto");
const student_update_dto_1 = require("./dto/student.update.dto");
const student_service_1 = require("./student.service");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async addStudent(data, req) {
        return this.studentService.addStudentDetails(req.user.userDetails.userData, data).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async updateStudent(data, req) {
        return this.studentService.updateStudentDetails(req.user.userDetails.userData, data).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getStudentDetails(id) {
        return this.studentService.getStudentDetails(id).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async deleteStudent(id) {
        return this.studentService.deleteStudent(Number(id)).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getStudentFeesDetails(id, year, req) {
        if (!year) {
            year = new Date().getFullYear();
        }
        return this.studentService.getStudentFeesDetails(Number(id), Number(year)).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async saveStudentFeesInBulk(data, req) {
        return this.studentService.saveStudentFeesInBulk(data.fees, req.user.userDetails.userData).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async saveStudentFee(data, req) {
        console.log(data);
        return this.studentService.saveStudentFees(data, req.user.userDetails.userData).catch((err) => {
            throw new common_1.HttpException({
                message: err.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll(page, count, search, gender, classes, start_date, end_date, order_by) {
        let data = {};
        data.searchData = {
            where: {},
        };
        console.log(data);
        if (gender) {
            data.searchData.where.gender = Number(gender);
        }
        if (classes) {
            data.searchData.where.class_id = Number(classes);
        }
        console.log(classes);
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
        return this.studentService.findAll(data).catch((err) => {
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
    (0, common_1.Post)('addStudent'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_create_dto_1.STUDENTCREATEDTO, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "addStudent", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Post)('updateStudent'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_update_dto_1.UPDATESTUDENTDTO, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Get)('studentDetails/:id'),
    (0, swagger_1.ApiParam)({
        name: "id", required: true
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getStudentDetails", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin]),
    (0, common_1.Post)('deleteStudent'),
    (0, swagger_1.ApiQuery)({ name: "id", required: true }),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "deleteStudent", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Get)('getStudentFeesDetails/:id'),
    (0, swagger_1.ApiParam)({ name: "id", required: true }),
    (0, swagger_1.ApiQuery)({ name: "year", required: false }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getStudentFeesDetails", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Post)('saveStudentFeesInBulk'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_addBulkFees_dto_1.ADDBULKFEESDTO, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "saveStudentFeesInBulk", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SetMetadata)('roles', [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, common_1.Post)('saveStudentFee'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_addFee_dto_1.ADDSTUDENTFEEDTO, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "saveStudentFee", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.SetMetadata)("roles", [constants_1.ROLE_ENUM.admin, constants_1.ROLE_ENUM.subAdmin]),
    (0, swagger_1.ApiQuery)({ name: "search", required: false }),
    (0, swagger_1.ApiQuery)({ name: "gender", required: false }),
    (0, swagger_1.ApiQuery)({ name: "classes", required: false }),
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
    __param(4, (0, common_1.Query)("classes")),
    __param(5, (0, common_1.Query)("start_date")),
    __param(6, (0, common_1.Query)("end_date")),
    __param(7, (0, common_1.Query)("order_by")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "findAll", null);
StudentController = __decorate([
    (0, common_1.Controller)('student'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map