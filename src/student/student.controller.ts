import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Request, SetMetadata, UseGuards } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiParam, ApiQuery } from "@nestjs/swagger";
import { ROLE_ENUM, START_DATE } from "src/constants";
import { RolesGuard } from "src/roleguard/roles.guard";
import { ADDBULKFEESDTO } from "./dto/student.addBulkFees.dto";
import { ADDSTUDENTFEEDTO } from "./dto/student.addFee.dto";
import { STUDENTCREATEDTO } from "./dto/student.create.dto";
import { DELETESTUDENTDTO } from "./dto/student.delete.dto";
import { UPDATESTUDENTDTO } from "./dto/student.update.dto";
import { StudentService } from "./student.service";
@Controller('student')
@ApiBearerAuth()
export class StudentController {
    constructor (private readonly studentService: StudentService) {}

    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @SetMetadata('roles', [ROLE_ENUM.admin, ROLE_ENUM.subAdmin])
    @Post('addStudent')
    async addStudent(@Body() data : STUDENTCREATEDTO, @Request() req){
        return this.studentService.addStudentDetails(req.user.userDetails.userData,data).catch((err) => {
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
    @Post('updateStudent')
    async updateStudent(@Body() data : UPDATESTUDENTDTO, @Request() req){
        return this.studentService.updateStudentDetails(req.user.userDetails.userData,data).catch((err) => {
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

    @Get('studentDetails/:id')
    @ApiParam({
      name:"id",required:true
    })
    async getStudentDetails(@Param("id") id :any) {

      return this.studentService.getStudentDetails(id).catch((err)=>{
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

    @Post('deleteStudent')
    async deleteStudent(@Body() data:DELETESTUDENTDTO) {
      return this.studentService.deleteStudent(data).catch((err) => {

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
    @Get('getStudentFeesDetails/:id')
    @ApiParam({name: "id", required:true})
    @ApiQuery({name:"year", required:false})
    async getStudentFeesDetails(@Param('id') id:number, @Query('year') year:number, @Request() req){

      if(!year){
        year = new Date().getFullYear()
      }

      return this.studentService.getStudentFeesDetails(Number(id),Number(year)).catch((err) => {
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
    @Post('saveStudentFeesInBulk')
      async saveStudentFeesInBulk(@Body() data:ADDBULKFEESDTO, @Request() req)
      {

        return this.studentService.saveStudentFeesInBulk(data.fees , req.user.userDetails.userData).catch((err) => {
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
    @Post('saveStudentFee')
      async saveStudentFee(@Body() data:ADDSTUDENTFEEDTO, @Request() req)
      {
        return this.studentService.saveStudentFees(data , req.user.userDetails.userData).catch((err) => {
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
    @ApiQuery({ name: "search", required: false })
    @ApiQuery({ name: "gender", required: false })
    @ApiQuery({ name: "classes", required: false })
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
      @Query("classes") classes: number,
      @Query("start_date") start_date: string,
      @Query("end_date") end_date: string,
      @Query("order_by") order_by: string,

    ): Promise<any> {
      let data = <any>{};
      data.searchData = {
        where: {
          
        },
      };

  data.searchData.where.status = 1;
  
      if (gender) {
        data.searchData.where.gender = Number(gender);
      }
  
      if (classes) {
        data.searchData.where.class_id = Number(classes);
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
  
      return this.studentService.findAll(data).catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST
        );
      });
    }

    


}