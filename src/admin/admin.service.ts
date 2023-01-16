import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { STATUS } from "src/constants";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AdminService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  public async createSubAdmin(payload, data: any) {
    data.created_by = payload.id;
    data.updated_by = payload.id;

    await this.prisma.admin.create({ data: data });

    return true;
  }

  public async updateSubAdminDetails(payload, data) {
    data.updated_by = payload.id;
    await this.prisma.admin.update({
      data: data,
      where: {
        id: Number(data.id),
      },
    });

    return true;
  }

  public async getSubAdminDetails(id: any) {
    const data = await this.prisma.admin.findUnique({
      where: {
        id: Number(id),
      },
    });

    return {
      res: data,
    };
  }

  public async deleteSubAdmin(id:any){
    await this.prisma.admin.update({
        data:{
            status:STATUS.delete
        },
        where:{
            id:Number(id)
        }
    })

    return true;
  }
}
