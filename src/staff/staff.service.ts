import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { STATUS } from "src/constants";
import { pagination } from "src/helper.function";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class StaffService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  public async findAll(data: any) {
    const [offset, limit] = await pagination(data.page, data.count);
    const countData = await this.prisma.staff.count(data.searchData);
    data.searchData.skip = offset;
    data.searchData.take = limit;

    if (data.order_by === "asc") {
      data.searchData.orderBy = {
        name: "asc",
      };
    } else if (data.order_by === "desc") {
      data.searchData.orderBy = {
        name: "desc",
      };
    } else {
      data.searchData.orderBy = {
        id: "desc",
      };
    }

    const values = await this.prisma.staff.findMany(data.searchData);

    const finalData = { res: { count: countData, data: values } };
    return finalData;
  }

  public async addStaffDetails(payload, data: any) {
    data.gender = Number(data.gender);
    data.created_by = payload.id;
    data.updated_by = payload.id;

    await this.prisma.staff.create({ data: data });

    return true;
  }

  public async updateStaffDetails(payload, data) {
    data.updated_by = payload.id;
    await this.prisma.staff.update({
      data: data,
      where: {
        id: Number(data.id),
      },
    });

    return true;
  }

  public async getStaffDetails(id: any) {
    const data = await this.prisma.staff.findUnique({
      where: {
        id: Number(id),
      },
    });

    return {
      res: data,
    };
  }

  public async deleteStaff(data) {
    await this.prisma.staff.update({
      data: {
        status: STATUS.delete,
      },
      where: {
        id: Number(data.id),
      },
    });

    return true;
  }

  public async saveStaffLeaves(data: any, payload) {
    data.created_by = payload.id;
    data.updated_by = payload.id;
    const from = <any>new Date(String(data.leave_from));
    const to = <any>new Date(String(data.leave_to));

    const leave_from_year = new Date(String(data.leave_from)).getFullYear();
    const leave_to_year = new Date(String(data.leave_to)).getFullYear();

    const leave_from_month = new Date(String(data.leave_from)).getMonth() + 1;
    const leave_to_month = new Date(String(data.leave_to)).getMonth() + 1;

    if (
      Number(leave_from_month) == Number(leave_to_month) &&
      leave_from_year == leave_to_year
    ) {
      data.leave_from = from;
      data.leave_to = to;
      const diffTime = <any>Math.abs(from - to);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      data.leave_count = diffDays + 1;
      if(Number(data.leave_type) == 4 ){
        data.leave_count = 0.5;
      }
      return this.prisma.staffLeaves.create({ data: data });
    } else {
      const new_to = <any>new Date(`${leave_from_year}-${leave_to_month}-1`);

      const diffTime1 = <any>Math.abs(from - new_to);
      const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
      const newData = <any>{
        staff_id: data.staff_id,
        leave_type: data.leave_type,
        leave_from: from,
        leave_to: new_to,
        leave_count: diffDays1,
        created_by: payload.id,
        updated_by: payload.id,
      };

      if(Number(data.leave_type) == 4 ){
        newData.leave_count = 0.5;
      }

      await this.prisma.staffLeaves.create({ data: newData });

      const new_from = <any>new Date(`${leave_to_year}-${leave_to_month}-2`);
      const diffTime2 = <any>Math.abs(new_from - to);
      const diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
      const newData2 = <any>{
        staff_id: data.staff_id,
        leave_type: data.leave_type,
        leave_from: new_from,
        leave_to: to,
        leave_count: diffDays2 + 1,
        created_by: payload.id,
        updated_by: payload.id,
      };
      if(Number(data.leave_type) == 4 ){
        newData2.leave_count = 0.5;
      }

      await this.prisma.staffLeaves.create({ data: newData2 });
    }

    return true;
  }

  public async getStaffLeaveDetails(data) {
    console.log(data.searchData.where);

    const staffLeavesInParticularMonth = await this.prisma.staffLeaves.findMany(
      data.searchData
    );
    console.log(staffLeavesInParticularMonth);

    return { res: staffLeavesInParticularMonth };
  }
}
