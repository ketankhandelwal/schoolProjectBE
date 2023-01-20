import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, Min, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
   
    profile_photo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone_number: string;

}