import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { STATUS } from "src/constants";
import { pagination } from "src/helper.function";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class StudentService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  public async addStudentDetails(payload, data: any) {
    data.gender = Number(data.gender);
    data.created_by = payload.id;
    data.updated_by = payload.id;

    await this.prisma.student.create({ data: data });

    return true;
  }

  public async updateStudentDetails(payload, data) {
    data.updated_by = payload.id;
    await this.prisma.student.update({
      data: data,
      where: {
        id: Number(data.id),
      },
    });

    return true;
  }

  public async getStudentDetails(id: any) {
    const data = await this.prisma.student.findUnique({
      where: {
        id: Number(id),
      },
    });

    return {
      res: data,
    };
  }

  public async deleteStudent(data: any) {
    await this.prisma.student.update({
      data: {
        status: STATUS.delete,
      },
      where: {
        id: Number(data.id),
      },
    });

    return true;
  }

  public async getStudentFeesDetails(id, year) {
    const monthCategoryDetails = <any>await this.prisma.months.findMany({
      where: {
        status: STATUS.active,
      },
    });

    year = year || new Date(Date.now()).getFullYear();

    let response: any = [
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
        year: year,
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
        year: year,
      },
      orderBy: {
        month: "asc",
      },
    });

    let n = 0;
    for (let i = 0; i < monthCategoryDetails.length; i++) {
      if (
        admissionAndDressFees[n] &&
        Number(admissionAndDressFees[n].month) == i + 1
      ) {
        response[i].admissionAndDressFees =
          admissionAndDressFees[n]._sum.amount;
        n++;
      } else {
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
        year: year,
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
      } else {
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
        status: STATUS.active,
        fees_type: 1,
        year: year,
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
      } else {
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
        year: year,
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
      } else {
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
        year: year,
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
      } else {
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
        year: year,
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
      } else {
        response[i].instalmentFees = 0;
      }
    }

    const totalFeesRemainingForSelectedYear =
      await this.prisma.setFees.findUnique({
        where: {
          class_year_unique_constraint: {
            year: year,
            class_id: 10,
          },
        },
      });

    return {
      res: {
        totalActions: totalFeesPaid._sum.amount,
        feesRemaingThisYear:
          totalFeesRemainingForSelectedYear?.total_months_fees_collected *
            totalFeesRemainingForSelectedYear?.fees_per_student -
          totalFeesPaid?._sum.amount,
        response,
      },
    };
  }

  public async saveStudentFees(data: any, payload) {
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
    } else {
      return this.prisma.studentFees.create({ data: data });
    }
  }

  public async saveStudentFeesInBulk(data: any, payload) {
    for (let student_fees_data of data) {
      await this.saveStudentFees(student_fees_data, payload);
    }

    return true;
  }

  public async findAll(data: any) {
    const [offset, limit] = await pagination(data.page, data.count);
    const countData = await this.prisma.student.count(data.searchData);
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

    const values = await this.prisma.student.findMany(data.searchData);

    const finalData = { res: { count: countData, data: values } };
    return finalData;
  }
}
