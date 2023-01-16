import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Request, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiQuery } from "@nestjs/swagger";
import { ROLE_ENUM } from "src/constants";
import { RolesGuard } from "src/roleguard/roles.guard";
import { AdminService } from "./admin.service";
import { CREATESUBADMINDTO } from "./dto/admin.create.subAdmin.dto";
import { UPDATESUBADMINDTO } from "./dto/admin.update.subAdmin.dto";

@Controller('admin')
export class AdminController{

    constructor (private readonly adminService: AdminService) {}

    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @SetMetadata('roles', [ROLE_ENUM.admin])
    @Post('createSubAdmin')
    async createSubAdmin(@Body() data : CREATESUBADMINDTO, @Request() req){
        return this.adminService.createSubAdmin(req.user.userDetails.userData,data).catch((err) => {
            throw new HttpException(
              {
                message: err.message,
              },
              HttpStatus.BAD_REQUEST
            );
          });

       
    }

    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @SetMetadata('roles', [ROLE_ENUM.admin])
    @Post('updateSubAdmin')
    async updateSubAdmin(@Body() data : UPDATESUBADMINDTO, @Request() req){
        return this.adminService.updateSubAdminDetails(req.user.userDetails.userData,data).catch((err) => {
            throw new HttpException(
              {
                message: err.message,
              },
              HttpStatus.BAD_REQUEST
            );
          });

       
    }

    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @SetMetadata('roles', [ROLE_ENUM.admin])

    @Get('subAdminDetails')
    @ApiQuery({
      name:"id",required:true
    })
    async getStudentDetails(@Query("id") id :any) {

      return this.adminService.getSubAdminDetails(id).catch((err)=>{
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST
        );
      });
    }


     @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @SetMetadata('roles', [ROLE_ENUM.admin])

    @Post('deleteSubAdmin')
    @ApiQuery({name:"id", required:true})
    async deleteStudent(@Query("id") id :any) {
      return this.adminService.deleteSubAdmin(Number(id)).catch((err) => {

        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST
        );

      })
    }



}