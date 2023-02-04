import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { UpdateSubadminpermissionDto } from './dto/subadminpermission.update.dto';


import {
  SubAdminPermission,
  Prisma,
} from '@prisma/client';

@Injectable()

export class SubadminpermissionService {
  constructor(private prisma: PrismaService) {
  }

  /**
   * Service for creating data
   */
  public async create(data: Prisma.SubAdminPermissionCreateInput): Promise<SubAdminPermission> {
    return this.prisma.subAdminPermission.create({
      data,
    });
  }

  /**
   * Service for fetching data by ID
   */
  public async findById(SubAdminPermissionWhereUniqueInput: Prisma.SubAdminPermissionWhereUniqueInput): Promise<SubAdminPermission | null> {
    const response = await this.prisma.subAdminPermission.findUnique({
      where: SubAdminPermissionWhereUniqueInput,
    });
    return this.convertBigintToString(response);
  }

  /**
   * Service for deleting the data
   */
  public async delete(request) {
    const response = await this.prisma.subAdminPermission.deleteMany(
      request
    );
    return response;
  }

  /**
   * Service for updating the data
   */
  public async update(id: number, request: UpdateSubadminpermissionDto) {


    return await this.prisma.subAdminPermission.updateMany({
      data: {
        ...request,
        id: undefined,
      },
      where: {
        id,
      },
    });

  }

  public async updateMany(request) {


    const response = await this.prisma.subAdminPermission.updateMany(
      request
    );
    return response;
  }


  /**
   * Service to get all the data with pagination
   */
  public async findAll() {
    const values = await this.prisma.permission.findMany(
      {
        where: {
          status: 1
        }
      }
    );
    return { "res": values };
  }
  /**
   * Service to get the data based on condition
   */
  public async findMany(data) {
    const response = await this.prisma.subAdminPermission.findMany({
      where: data
    }
    );
    return response;
  }
 
  convertBigintToString(obj) {

    for (const key in obj) {
      // convert main tree
      if (typeof (obj[key]) == 'bigint') {
        obj[key] = obj[key].toString();
      }

      for (const prop in obj[key]) {

        // recursively search for inner branches
        if (typeof (obj[key][prop]) == 'object') {
          this.convertBigintToString(obj[key])
        } else {
          if (typeof (obj[key][prop]) == 'bigint') {
            obj[key][prop] = obj[key][prop].toString();
          }
        }
      }
    }
    return obj;
  }



}

