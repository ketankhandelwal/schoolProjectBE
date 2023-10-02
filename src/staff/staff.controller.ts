import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Request, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiParam, ApiQuery } from "@nestjs/swagger";
import { NUMBER, ROLE_ENUM, START_DATE } from "src/constants";
import { RolesGuard } from "src/roleguard/roles.guard";
import { CREATESTAFFDTO } from "./dto/staff.create.dto";
import { DELETESTAFFDTO } from "./dto/staff.delete.dto";
import { ADDSTAFFLEAVESDTO } from "./dto/staff.leaves.dto";
import { UPDATESTAFFDTO } from "./dto/staff.update.dto";
import { StaffService } from "./staff.service";

@Controller('staff')
@ApiBearerAuth()
export class StaffController{

    constructor(private readonly staffService: StaffService) {}

    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard("jwt"))
    @SetMetadata("roles", [ROLE_ENUM.admin, ROLE_ENUM.subAdmin])
    @ApiQuery({ name: "search", required: false })
    @ApiQuery({ name: "gender", required: false })
    @ApiQuery({name:"subject",required:false})
    @ApiQuery({name:"role", required:false})
    
    @ApiQuery({ name: "start_date", required: false })
    @ApiQuery({ name: "end_date", required: false })
    @ApiQuery({
      name: "order_by",
      required: false,
    })
    @Get('findAll')
    public async findAll(
      @Query("page") page: number,
      @Query("count") count: number,
      @Query("search") search: string,
      @Query("gender") gender: number,
     
      @Query('subject') subject:string,
      @Query('role') role:number,
      @Query("start_date") start_date: string,
      @Query("end_date") end_date: string,
      @Query("order_by") order_by: string,

    ): Promise<any> {
      let data = <any>{};
      data.searchData =<any> {
        where: {
            status: NUMBER.one
        },
      };

      if (gender) {
        data.searchData.where.gender = Number(gender);
      }


      if (subject) {
        data.searchData.where.subject = String(subject);
      }

      if (role) {
        data.searchData.where.role = Number(role);
      }
  
      if (start_date || end_date) {
        if (start_date) {
          start_date += " 00:00:00";
        } else {
          start_date = START_DATE;
        }
  
        if (end_date) {
          end_date += " 23:59:59";
        } else {
          let current_date = new Date();
          end_date = current_date.toISOString().split("T")[0] + " 23:59:59";
        }
  
        data.searchData.where.created_at = {
          lte: new Date(end_date),
          gte: new Date(start_date),
        };
      }
      data.order_by = order_by;
  
      data.page = page;
      data.count = count;
      if (search) {
        data.searchData.where.OR = [
          {
            name: {
              contains: search,
            },
          }
        ];
      }
  
      return this.staffService.findAll(data).catch((err) => {
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
    @SetMetadata('roles', [ROLE_ENUM.admin, ROLE_ENUM.subAdmin])
    @Post('addStaff')
    async addStudent(@Body() data : CREATESTAFFDTO ,@Request() req){
        return this.staffService.addStaffDetails(req.user.userDetails.userData,data).catch((err) => {
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
    @SetMetadata('roles', [ROLE_ENUM.admin, ROLE_ENUM.subAdmin])
    @Post('updateStaff')
    async updateStudent(@Body() data : UPDATESTAFFDTO, @Request() req){
  
        return this.staffService.updateStaffDetails(req.user.userDetails.userData,data).catch((err) => {
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
    @SetMetadata('roles', [ROLE_ENUM.admin, ROLE_ENUM.subAdmin])

    @Get('staffDetails/:id')
    @ApiParam({
      name:"id",required:true
    })
    async getStudentDetails(@Param("id") id :any) {

      return this.staffService.getStaffDetails(id).catch((err)=>{
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

    @Post('deleteStaff')
   
    async deleteStudent(@Body()data: DELETESTAFFDTO) {
      return this.staffService.deleteStaff(data).catch((err) => {

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
    @SetMetadata('roles', [ROLE_ENUM.admin,  ROLE_ENUM.subAdmin])
    @Post('saveStaffLeaves')
      async saveStudentFee(@Body() data:ADDSTAFFLEAVESDTO, @Request() req)
      {

        return this.staffService.saveStaffLeaves(data , req.user.userDetails.userData).catch((err) => {
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
    @SetMetadata('roles', [ROLE_ENUM.admin,  ROLE_ENUM.subAdmin])
    @Get('getStaffLeavesDetails')
    @ApiQuery({name: "id", required:false})
    @ApiQuery({name:"year", required:false})
    @ApiQuery({name:"month", required:false})
    @ApiQuery({name:"leave_type", required:false})
    public async getStaffLeavesDetails(@Query('id') id:any, @Query('month') month:number, @Query('year') year:number, @Query('leave_type') leave_type: number, @Request() req): Promise<any>{
  

      let data = <any>{};
      data.searchData =<any> {
        where: {
            status: NUMBER.one,
            staff_id : Number(id)
        },
      };

      if(leave_type){
        data.searchData.where.leave_type = Number(leave_type);
      }

      if(month){
        data.searchData.where.leave_from = {
          lte: new Date(`${new Date().getFullYear()}-${Number(month)+1}-1`),
          gte: new Date(`${new Date().getFullYear()}-${month}-1`)
        }
      }

      if(year){

        data.searchData.where.leave_from = {
          lte: new Date(`${Number(year)+1}-${1}-1`),
          gte: new Date(`${year}-${1}-1`)
        }

      }

      if(year && month){

        data.searchData.where.leave_from = {
          lte: new Date(`${year}-${Number(month)+1}-1`),
          gte: new Date(`${year}-${month}-1`)
        }

      }

      return this.staffService.getStaffLeaveDetails(data).catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST
        );

      })

      

    }




}