import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin, Prisma } from "@prisma/client";
import { NUMBER, STATUS } from "src/constants";
import { MESSAGE } from "src/message";
import { PrismaService } from "src/prisma.service";

import { UpdateAdminDto } from "./dto/admin.update.dto";
const bcrypt = require("bcrypt");

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

  public async getAdminDetails(id:any) {
    const data   = await this.prisma.admin.findUnique({
      where:{
        id:Number(id)
      }
    });
    console.log(data);

    delete data.password;
    return {
      res:data
    };

  }

  public async getSubAdminDetails(id: any) {
    const data = await this.prisma.admin.findUnique({
      where: {
        id: Number(id),
      },
    });
    delete data.password

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

  public async update(id: number, request: UpdateAdminDto) {
    return this.prisma.admin.updateMany({
      data: {
        ...request,
        id: undefined,
      },
      where: {
        id,
      },
    });
  }

  public async findById(
    AdminWhereUniqueInput: Prisma.AdminWhereUniqueInput
  ): Promise<Admin | null> {
    const response = await this.prisma.admin.findUnique({
      where: AdminWhereUniqueInput,
    });
    return response;
  }


  public async changePassword(user: any, userDetails: any) {
    if (userDetails && userDetails["userDetails"]) {
      let userDetailsValue = await this.findById({
        id: userDetails["userDetails"]["userData"]["id"],
      });
      console.log(userDetailsValue)
 let matchPassword = await bcrypt.compare(user.old_password, userDetailsValue.password)
      console.log(matchPassword);
      if (!matchPassword) {
        throw new HttpException(
          { message: MESSAGE.oldPasswordNotMatch },
          HttpStatus.BAD_REQUEST
        );
      }
      let password = await bcrypt.hash(
        user.new_password,
        parseInt(process.env.HASH_SALT_ROUNDS)
      );

      let adminUpdateData = <any>{
        created_by: NUMBER.zero,
        updated_by: NUMBER.zero,
        updated_at: new Date(),
        password: password,
      };
      if (this.update(userDetailsValue.id, adminUpdateData)) {
        return { message: MESSAGE.resetPasswordSuccess };
      }
    } else {
      throw new HttpException(
        { message: MESSAGE.userNotExists },
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async updateAdmin(reqData, id) {
    return this.prisma.admin.updateMany({
      data: reqData,
      where: {
        id,
      },
    });
  }

}
