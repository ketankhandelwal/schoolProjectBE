import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  SetMetadata
} from '@nestjs/common';
import { SubAdminPermission as subadminpermissionModel } from '@prisma/client'
import { SubadminpermissionService } from './subadminpermission.service';
import { UpdateSubadminpermissionDto } from './dto/subadminpermission.update.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from './../roleguard/roles.guard';
import { ROLE_ENUM, NUMBER } from '../constants';

@UseGuards(RolesGuard)
@ApiBearerAuth()

@Controller('subadminpermission')
export class SubadminpermissionController {

  constructor(private readonly subadminpermissionService: SubadminpermissionService,
  ) { }

  /**
   * Controller for getting all data
   */
  @UseGuards(AuthGuard('jwt'))
  @SetMetadata('roles', [ROLE_ENUM.admin, ROLE_ENUM.subAdmin])
  @Get('permissionsList')
  public async finadAll(
  ): Promise<any> {
    return this.subadminpermissionService.findAll().catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  /**
   * Controller to get data based on id
   */
  @Get(':id')
  async getById(@Param('id') id: any): Promise<subadminpermissionModel> {
    return this.subadminpermissionService.findById({ id: Number(id) })
  }

  /**
   * Contoller to create the data
   * @param data 
   * @returns 
   */
  @Post('create')
  async create(
    @Body() data: any
  ): Promise<subadminpermissionModel> {
    return this.subadminpermissionService.create(data).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  /**
   * Controller to delete data
   */
  @Delete()
  async deletePost(@Body() request: any): Promise<any> {
    return this.subadminpermissionService.delete(request).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  /**
   * Controller to update data
   */
  @Put(':id')
  async update(
    @Param() id: Number,
    @Body() request: UpdateSubadminpermissionDto
  ): Promise<any> {
    return this.subadminpermissionService.update(Number(id), request).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  /**
   * contrioller to update Many
   */
  @Put()
  async updateMany(
    @Body() request: any
  ): Promise<any> {
    return this.subadminpermissionService.updateMany(request).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });
  }



}
