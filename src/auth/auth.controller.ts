import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  SetMetadata,  
} from '@nestjs/common';


import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/auth.create.dto';
import { ROLE_ENUM } from 'src/constants';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roleguard/roles.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
/**
 * Admin Login FLow
 * @param req 
 * @returns 
 */


@ApiBody({
  type: CreateAuthDto
})

//CheckRole
@Post('adminLogin')
public async adminLogin(@Body() req: CreateAuthDto) {
 

  return this.authService.adminLogin(req, ROLE_ENUM.admin).catch(err => {
    throw new HttpException({
      message: err.message
    }, HttpStatus.BAD_REQUEST);
  });
}




}
