import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { MESSAGE } from "src/message";
import { ROLE_ENUM, STATUS } from "src/constants";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";


const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
   
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}


  public async validateAdmin(data): Promise<any> {
   
    const admin = await this.prisma.admin.findFirst({
      where:{
        email:data.email,
        status:data.status,
        role:data.role
      }
    })

    if (admin ) {
      return admin;
    }
    return null;
  }

  
  public async adminLogin(user: any) {
    var userDetails = {};
    let loginData = <any>{
      email: user.email,
      status: STATUS.active,
      
    };

    userDetails = await this.validateAdmin(loginData);

    if (userDetails) {
      
      const userDetailsValue =<any> userDetails;
      if (userDetailsValue.status != 1) {
        throw new HttpException(
          { message: MESSAGE.userInactiveOrDeleteByAdmin },
          HttpStatus.BAD_REQUEST
        );
      }

      // start of password check, valid or not
      let matchPassword = await bcrypt.compare(
        user.password,
        userDetailsValue.password
      );
      if (!matchPassword) {
        throw new HttpException(
          { message: MESSAGE.passwordNotMatch },
          HttpStatus.BAD_REQUEST
        );
      } // end of password check
      delete userDetailsValue.password;


      const payload = { userData: userDetailsValue };
      if ( userDetailsValue && Number(userDetailsValue.role) == ROLE_ENUM.subAdmin) {
        userDetailsValue.permission =
          await this.prisma.subAdminPermission.findMany({
            where: {
              sub_admin_id: Number(userDetailsValue.id),
            },
          });
        }
      

      return {
        res: {
          user_details: userDetailsValue,
          access_token: this.jwtService.sign(payload)
        },
      };
    } else {
      throw new HttpException(
        { message: MESSAGE.invalidEmail },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
