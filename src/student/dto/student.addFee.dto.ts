import { IsEmail, IsString, IsNotEmpty, MinLength, IsNumber, IsEnum, Min } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';


export class ADDSTUDENTFEEDTO {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    student_id: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    month: number;

    @ApiProperty()
    
    @IsNotEmpty()
    @IsNumber()
    year:number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    
    fees_type: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount:number;


}