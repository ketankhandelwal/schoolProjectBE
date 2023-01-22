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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
const helper_function_1 = require("../helper.function");
const prisma_service_1 = require("../prisma.service");
let StaffService = class StaffService {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async findAll(data) {
        const [offset, limit] = await (0, helper_function_1.pagination)(data.page, data.count);
        const countData = await this.prisma.staff.count(data.searchData);
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
        const values = await this.prisma.staff.findMany(data.searchData);
        const finalData = { res: { count: countData, data: values } };
        return finalData;
    }
    async addStaffDetails(payload, data) {
        data.gender = Number(data.gender);
        data.created_by = payload.id;
        data.updated_by = payload.id;
        await this.prisma.staff.create({ data: data });
        return true;
    }
    async updateStaffDetails(payload, data) {
        data.updated_by = payload.id;
        await this.prisma.staff.update({
            data: data,
            where: {
                id: Number(data.id),
            },
        });
        return true;
    }
    async getStaffDetails(id) {
        const data = await this.prisma.staff.findUnique({
            where: {
                id: Number(id),
            },
        });
        return {
            res: data,
        };
    }
    async deleteStaff(data) {
        await this.prisma.staff.update({
            data: {
                status: constants_1.STATUS.delete,
            },
            where: {
                id: Number(data.id),
            },
        });
        return true;
    }
    async saveStaffLeaves(data, payload) {
        (data.created_by = payload.id), (data.updated_by = payload.id);
        const from = new Date(String(data.leave_from));
        const to = new Date(String(data.leave_to));
        const leave_from_year = new Date(String(data.leave_from)).getFullYear();
        const leave_to_year = new Date(String(data.leave_to)).getFullYear();
        const leave_from_month = new Date(String(data.leave_from)).getMonth() + 1;
        const leave_to_month = new Date(String(data.leave_to)).getMonth() + 1;
        if (Number(leave_from_month) == Number(leave_to_month) &&
            leave_from_year == leave_to_year) {
            data.leave_from = from;
            data.leave_to = to;
            const diffTime = Math.abs(from - to);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            data.leave_count = diffDays + 1;
            return this.prisma.staffLeaves.create({ data: data });
        }
        else {
            const new_to = new Date(`${leave_from_year}-${leave_to_month}-1`);
            console.log(new_to);
            const diffTime1 = Math.abs(from - new_to);
            const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
            const newData = {
                staff_id: data.staff_id,
                leave_type: data.leave_type,
                leave_from: from,
                leave_to: new_to,
                leave_count: diffDays1,
                created_by: payload.id,
                updated_by: payload.id,
            };
            await this.prisma.staffLeaves.create({ data: newData });
            const new_from = new Date(`${leave_to_year}-${leave_to_month}-2`);
            console.log(new_from);
            const diffTime2 = Math.abs(new_from - to);
            const diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
            const newData2 = {
                staff_id: data.staff_id,
                leave_type: data.leave_type,
                leave_from: new_from,
                leave_to: to,
                leave_count: diffDays2 + 1,
                created_by: payload.id,
                updated_by: payload.id,
            };
            await this.prisma.staffLeaves.create({ data: newData2 });
        }
        return true;
    }
    async getStaffLeaveDetails(data) {
        console.log(data.searchData.where);
        const staffLeavesInParticularMonth = await this.prisma.staffLeaves.findMany(data.searchData);
        console.log(staffLeavesInParticularMonth);
        return { res: staffLeavesInParticularMonth };
    }
};
StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, prisma_service_1.PrismaService])
], StaffService);
exports.StaffService = StaffService;
//# sourceMappingURL=staff.service.js.map