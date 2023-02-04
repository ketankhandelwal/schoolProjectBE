import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateSubadminpermissionDto } from './subadminpermission.create.dto';

export class UpdateSubadminpermissionDto extends PartialType(CreateSubadminpermissionDto) {


}