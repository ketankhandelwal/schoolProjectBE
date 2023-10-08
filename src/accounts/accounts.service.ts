import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AccountService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}
  public async setClassFeesByYear(payload, data: any) {
    const result = await this.prisma.setFees.upsert({
      where: {
        class_year_unique_constraint: {
          class_id: data.class_id,
          year: data.year,
        },
      },
      update: {
        fees_per_student: data?.fees_per_student,
        total_students: data?.total_student,
        total_months_fees_collected: data?.total_months_fees_collected,
      },
      create: {
        fees_per_student: data?.fees_per_student,
        total_students: data?.total_student,
        class_id: data?.class_id,
        year: data?.year,
        total_months_fees_collected: data?.total_months_fees_collected,
      },
    });

    const total_fees_amount =
      result?.total_students *
      result?.fees_per_student *
      result?.total_months_fees_collected;

    const activeStudents = await this.prisma.student.findMany({
      where: {
        class_id: result.class_id,
        status: 1, // Assuming you have an "isActive" field to identify active students
      },
      select: {
        id: true,
      },
    });

    // Extract student IDs from the result
    const studentIds = activeStudents.map((student) => student.id);


    // Calculate the total amount collected for active students within a specific year and class
    const feesSum = await this.prisma.studentFees.groupBy({
      by: ["year"],
      _sum: {
        amount: true,
      },
      where: {
        year: result.year,
        student_id: {
          in: studentIds,
        },
      },
    });

    return {
      res: {
        result,
        total_fees_amount_year: total_fees_amount,
        fees_collected_year: feesSum[0]?._sum.amount,
        remaining_fees_year: total_fees_amount - feesSum[0]?._sum.amount,
      },
    };
  }

  public async getSetFeesByClass(payload, class_id, year) {
    year = year || new Date(Date.now()).getFullYear();

    const findStudentIds = await this.prisma.student.findMany({
      where: {
        class_id: Number(class_id),
        status: 1,
      },
      select: {
        id: true,
      },
    });

    const studentIds = findStudentIds.map((student) => student.id);

    // Calculate the total amount collected for active students within a specific year and class
    const feesSum = await this.prisma.studentFees.groupBy({
      by: ["year"],
      _sum: {
        amount: true,
      },
      where: {
        year: Number(year),
        student_id: {
          in: studentIds,
        },
      },
    });

    const result = await this.prisma.setFees.findUnique({
      where: {
        class_year_unique_constraint: {
          year: Number(year),
          class_id: Number(class_id),
        },
      },
    });
    return {
      res: {
        result,
        remaingAmountForThisYear:
          result?.fees_per_student *
            result?.total_months_fees_collected *
            result?.total_students -
          feesSum[0]?._sum.amount,
      },
    };
  }
}
