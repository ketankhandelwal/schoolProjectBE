import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Request, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from "@nestjs/swagger";
import { ROLE_ENUM } from "src/constants";
import { RolesGuard } from "src/roleguard/roles.guard";
import { AdminService } from "./admin.service";
import { UpdateAdminChangePasswordDto } from "./dto/admin.changePassword.dto";
import { CREATESUBADMINDTO } from "./dto/admin.create.subAdmin.dto";
import { UpdateAdminDto } from "./dto/admin.update.dto";
import { UPDATESUBADMINDTO } from "./dto/admin.update.subAdmin.dto";
@ApiBearerAuth()
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


    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @SetMetadata('roles', [ROLE_ENUM.admin, ROLE_ENUM.subAdmin])
    @Get('adminDetails')
  
    async getAdminDetails(@Request() req:any){
      console.log(req.user.userDetails.userData.id);
      return this.adminService.getAdminDetails(req.user.userDetails.userData.id).catch((err) => {

        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST
        );

      })
    }

    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard("jwt"))
    @SetMetadata("roles", [ROLE_ENUM.admin, ROLE_ENUM.subAdmin])
    @ApiBearerAuth()
    @ApiBody({
      type: UpdateAdminChangePasswordDto,
    })
    @Post("adminChangePassword")
    public async adminChangePassword(
      @Body() data: UpdateAdminChangePasswordDto,
      @Request() req
    ) {
      return this.adminService.changePassword(data, req.user).catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST
        );
      });
    }

    @Post("update")
    async update(@Body() data: UpdateAdminDto, @Request() req): Promise<any> {
      return this.adminService
        .updateAdmin(data, Number(req.user.userDetails.userData.id))
        .catch((err) => {
          throw new HttpException(
            {
              message: err.message,
            },
            HttpStatus.BAD_REQUEST
          );
        });
    }



}