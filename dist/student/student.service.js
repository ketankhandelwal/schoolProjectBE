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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
const helper_function_1 = require("../helper.function");
const prisma_service_1 = require("../prisma.service");
let StudentService = class StudentService {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async addStudentDetails(payload, data) {
        data.gender = Number(data.gender);
        data.created_by = payload.id;
        data.updated_by = payload.id;
        await this.prisma.student.create({ data: data });
        return true;
    }
    async updateStudentDetails(payload, data) {
        data.updated_by = payload.id;
        await this.prisma.student.update({
            data: data,
            where: {
                id: Number(data.id),
            },
        });
        return true;
    }
    async getStudentDetails(id) {
        const data = await this.prisma.student.findUnique({
            where: {
                id: Number(id),
            },
        });
        return {
            res: data,
        };
    }
    async deleteStudent(id) {
        await this.prisma.student.update({
            data: {
                status: constants_1.STATUS.delete,
            },
            where: {
                id: Number(id),
            },
        });
        return true;
    }
    async getStudentFeesDetails(id, year) {
        const monthCategoryDetails = await this.prisma.months.findMany({
            where: {
                status: constants_1.STATUS.active,
            },
        });
        let response = [
            { CategoryName: monthCategoryDetails[0].name },
            { CategoryName: monthCategoryDetails[1].name },
            { CategoryName: monthCategoryDetails[2].name },
            { CategoryName: monthCategoryDetails[3].name },
            { CategoryName: monthCategoryDetails[4].name },
            { CategoryName: monthCategoryDetails[5].name },
            { CategoryName: monthCategoryDetails[6].name },
            { CategoryName: monthCategoryDetails[7].name },
            { CategoryName: monthCategoryDetails[8].name },
            { CategoryName: monthCategoryDetails[9].name },
            { CategoryName: monthCategoryDetails[10].name },
            { CategoryName: monthCategoryDetails[11].name },
        ];
        const totalFeesPaid = await this.prisma.studentFees.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                student_id: Number(id),
            },
        });
        const admissionAndDressFees = await this.prisma.studentFees.groupBy({
            by: ["month"],
            _sum: {
                amount: true,
            },
            where: {
                student_id: Number(id),
                fees_type: 4,
            },
            orderBy: {
                month: "asc",
            },
        });
        let n = 0;
        for (let i = 0; i < monthCategoryDetails.length; i++) {
            if (admissionAndDressFees[n] &&
                Number(admissionAndDressFees[n].month) == i + 1) {
                response[i].admissionAndDressFees =
                    admissionAndDressFees[n]._sum.amount;
                n++;
            }
            else {
                response[i].admissionAndDressFees = 0;
            }
        }
        const TransportFees = await this.prisma.studentFees.groupBy({
            by: ["month"],
            _sum: {
                amount: true,
            },
            where: {
                student_id: Number(id),
                fees_type: 5,
            },
            orderBy: {
                month: "asc",
            },
        });
        let o = 0;
        for (let i = 0; i < monthCategoryDetails.length; i++) {
            if (TransportFees[o] && Number(TransportFees[o].month) == i + 1) {
                response[i].TransportFees = TransportFees[o]._sum.amount;
                o++;
            }
            else {
                response[i].TransportFees = 0;
            }
        }
        const regularFees = await this.prisma.studentFees.groupBy({
            by: ["month"],
            _sum: {
                amount: true,
            },
            where: {
                student_id: Number(id),
                status: constants_1.STATUS.active,
                fees_type: 1,
            },
            orderBy: {
                month: "asc",
            },
        });
        let m = 0;
        for (let i = 0; i < monthCategoryDetails.length; i++) {
            if (regularFees[m] && Number(regularFees[m].month) == i + 1) {
                response[i].regularFees = regularFees[m]._sum.amount;
                m++;
            }
            else {
                response[i].regularFees = 0;
            }
        }
        const examFees = await this.prisma.studentFees.groupBy({
            by: ["month"],
            _sum: {
                amount: true,
            },
            where: {
                student_id: Number(id),
                fees_type: 2,
            },
            orderBy: {
                month: "asc",
            },
        });
        let k = 0;
        for (let i = 0; i < monthCategoryDetails.length; i++) {
            if (examFees[k] && Number(examFees[k].month) == i + 1) {
                response[i].examFees = examFees[k]._sum.amount;
                k++;
            }
            else {
                response[i].examFees = 0;
            }
        }
        const lateFees = await this.prisma.studentFees.groupBy({
            by: ["month"],
            _sum: {
                amount: true,
            },
            where: {
                student_id: Number(id),
                fees_type: 3,
            },
            orderBy: {
                month: "asc",
            },
        });
        let l = 0;
        for (let i = 0; i < monthCategoryDetails.length; i++) {
            if (lateFees[l] && Number(lateFees[l].month) == i + 1) {
                response[i].lateFees = lateFees[l]._sum.amount;
                l++;
            }
            else {
                response[i].lateFees = 0;
            }
        }
        const instalmentFees = await this.prisma.studentFees.groupBy({
            by: ["month"],
            _sum: {
                amount: true,
            },
            where: {
                student_id: Number(id),
                fees_type: 6,
            },
            orderBy: {
                month: "asc",
            },
        });
        let z = 0;
        for (let i = 0; i < monthCategoryDetails.length; i++) {
            if (instalmentFees[z] && Number(instalmentFees[z].month) == i + 1) {
                response[i].instalmentFees = instalmentFees[z]._sum.amount;
                z++;
            }
            else {
                response[i].instalmentFees = 0;
            }
        }
        return {
            res: {
                totalActions: totalFeesPaid._sum.amount,
                response,
            },
        };
    }
    async saveStudentFees(data, payload) {
        (data.created_by = payload.id), (data.updated_by = payload.id);
        const checkData = await this.prisma.studentFees.findFirst({
            where: {
                student_id: data.student_id,
                month: data.month,
                year: data.year,
                fees_type: data.fees_type,
            },
            select: {
                amount: true,
            },
        });
        if (checkData) {
            return this.prisma.studentFees.updateMany({
                data: {
                    amount: checkData.amount + data.amount,
                },
                where: {
                    student_id: data.student_id,
                    month: data.month,
                    year: data.year,
                    fees_type: data.fees_type,
                },
            });
        }
        else {
            return this.prisma.studentFees.create({ data: data });
        }
    }
    async saveStudentFeesInBulk(data, payload) {
        for (let student_fees_data of data) {
            await this.saveStudentFees(student_fees_data, payload);
        }
        return true;
    }
    async findAll(data) {
        const [offset, limit] = await (0, helper_function_1.pagination)(data.page, data.count);
        const countData = await this.prisma.student.count(data.searchData);
        data.searchData.skip = offset;
        data.searchData.take = limit;
        if (data.order_by === "asc") {
            data.searchData.orderBy = {
                name: "asc",
            };
        }
        else if (data.order_by === "desc") {
            data.searchData.orderBy = {
                name: "desc",
            };
        }
        else {
            data.searchData.orderBy = {
                id: "desc",
            };
        }
        const values = await this.prisma.student.findMany(data.searchData);
        const finalData = { res: { count: countData, data: values } };
        return finalData;
    }
};
StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, prisma_service_1.PrismaService])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map