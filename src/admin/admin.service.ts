import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin, Prisma } from "@prisma/client";
import { NUMBER, ROLE_ENUM, STATUS, TOTAL_PERMISSIONS } from "src/constants";
import { pagination } from "src/helper.function";
import { MESSAGE } from "src/message";
import { PrismaService } from "src/prisma.service";

import { UpdateAdminDto } from "./dto/admin.update.dto";
const bcrypt = require("bcrypt");
let generator = require("generate-password");

@Injectable()
export class AdminService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  public async createSubAdmin(payload, data: any) {
    let emailCheck = await this.prisma.admin.findFirst({
      where: {
        email: data.email,
      },
    });
    if (emailCheck && emailCheck.id) {
      throw new HttpException(
        { message: MESSAGE.userAlreadyExists },
        HttpStatus.BAD_REQUEST
      );
    }

    let hashPassword = await bcrypt.hash(
      data.password,
      parseInt(process.env.HASH_SALT_ROUNDS)
    );

    let createSubAdminData = <any>{
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      password: hashPassword,
      role: data.role,
      designation: data.designation,
      created_by: Number(payload.id),
      updated_by: Number(payload.id),
    };

    let finalData = await this.prisma.admin.create({
      data: createSubAdminData,
    });

    for (let key of data.permission) {
      let createSubAdminPermissionData = <any>{
        sub_admin_id: Number(finalData.id),
        permission_id: Number(key.id),

        status: Number(key.status),
        created_by: Number(payload.id),
        updated_by: Number(payload.id),
      };

      await this.prisma.subAdminPermission.create({
        data: createSubAdminPermissionData,
      });
    }

    return { res: finalData };
  }

  public async updateSubAdminDetails(payloadData, reqData: any) {
    const adminData: any = {};
    adminData.name = reqData.name;
    adminData.phone_number = reqData.phone_number;
    adminData.updated_at = new Date();
    adminData.updated_by = payloadData.id;
    adminData.designation = reqData.designation;

    const subAdminData: any = {};
    subAdminData.permission = reqData.permission;

    await this.prisma.admin.update({
      data: adminData,
      where: {
        id: Number(reqData.id),
      },
    });

    // logic for subAdmin who donot have permission_id 8 or 9 or future permissions

    const countSubAdminPermissions = await this.prisma.subAdminPermission.count(
      {
        where: {
          sub_admin_id: Number(reqData.id),
        },
      }
    );

    if (
      countSubAdminPermissions < TOTAL_PERMISSIONS.total_subadmin_permissions
    ) {
      for (
        let i = countSubAdminPermissions + 1;
        i <= TOTAL_PERMISSIONS.total_subadmin_permissions;
        i++
      ) {
        const newSubAdminData = {
          sub_admin_id: reqData.id,
          permission_id: i,
          status: STATUS.inactive,
          created_by: payloadData.id,
          updated_by: payloadData.id,
        };
        await this.prisma.subAdminPermission.create({
          data: newSubAdminData,
        });
      }
    }

    for (const elements of subAdminData.permission) {
      await this.prisma.subAdminPermission.updateMany({
        data: {
          status: elements.status,
          updated_at: new Date(),
        },
        where: {
          sub_admin_id: Number(reqData.id),
          permission_id: elements.permission_id,
        },
      });
    }

    const adminUser = await this.prisma.admin.findUnique({
      where: {
        id: Number(reqData.id),
      },
    });

    delete adminUser.password;

    return {
      res: {
        userDeatils: adminUser,
        permission: await this.prisma.subAdminPermission.findMany({
          where: {
            sub_admin_id: Number(reqData.id),
          },
        }),
        messgae: "Admin Updated",
      },
    };
  }

  public async getAdminDetails(id: any) {
    const data = await this.prisma.admin.findUnique({
      where: {
        id: Number(id),
      },
    });

    delete data.password;
    return {
      res: data,
    };
  }

  public async getSubAdminDetails(id: any) {
    const data = <any>await this.prisma.admin.findUnique({
      where: {
        id: Number(id),
      },
    });
    delete data.password;
    data.permissions = await this.prisma.subAdminPermission.findMany({
      where: {
        sub_admin_id: Number(id),
      },
    });

    return {
      res: data,
    };
  }

  public async deleteSubAdmin(id: any) {
    await this.prisma.admin.update({
      data: {
        status: STATUS.delete,
      },
      where: {
        id: Number(id),
      },
    });

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

      let matchPassword = await bcrypt.compare(
        user.old_password,
        userDetailsValue.password
      );

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

  public async getSubAdminList(data, request) {
    const [offset, limit] = await pagination(data.page, data.count);
    const countData = await this.prisma.admin.count(data.searchData);
    data.searchData.skip = offset;
    data.searchData.take = limit;

    let response = await this.prisma.admin.findMany(data.searchData);
    const finalData = { count: countData, finalData: response };
    return { res: finalData };
  }

  public async getPermissionList(id: any) {
    const newAdmin: any = {};
    newAdmin.permission = await this.prisma.subAdminPermission.findMany({
      where: {
        sub_admin_id: Number(id),
      },
    });

    return {
      res: {
        subAdminPermission: newAdmin.permission,
      },
    };
  }
}
