import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from "@nestjs/swagger";
import { ROLE_ENUM, START_DATE, STATUS } from "src/constants";
import { RolesGuard } from "src/roleguard/roles.guard";
import { AccountService } from "./accounts.service";
import { SETCLASSFEESBYYEAR } from "./dto/accounts.setClassFeesByYear";
@ApiBearerAuth()
@Controller("accounts")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard("jwt"))
  @SetMetadata("roles", [ROLE_ENUM.admin, ROLE_ENUM.subAdmin])
  @Post("setClassFeesByYear")
  async setClassFeesByYear(@Body() data: SETCLASSFEESBYYEAR, @Request() req) {
    return this.accountService
      .setClassFeesByYear(req.user.userDetails.userData, data)
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard("jwt"))
  @SetMetadata("roles", [ROLE_ENUM.admin, ROLE_ENUM.subAdmin])
  @Get("getSetFeesByClass")
  @ApiQuery({
    name: "year",
    required: false,
  })
  @ApiQuery({
    name: "class_id",
    required: true,
  })
  async getSetFeesByClass(
    @Query("class_id") class_id: number,
    @Query("year") year: number,
    @Request() req
  ) {
    return this.accountService
      .getSetFeesByClass(req.user.userDetails.userData, class_id, year)
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
