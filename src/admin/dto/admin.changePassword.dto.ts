import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminChangePasswordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    old_password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    new_password: string;
}