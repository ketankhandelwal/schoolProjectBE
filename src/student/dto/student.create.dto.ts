import { ApiProperty } from "@nestjs/swagger";
import { int } from "aws-sdk/clients/datapipeline";
import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class STUDENTCREATEDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

  

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    class_id  : number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sec: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone_number: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    mother_name:string;

    @ApiProperty()
    @IsString()
    father_name: string;

    @ApiProperty()
    @IsString()
    previous_school: string;

    @ApiProperty()
    @IsString()
    emergency_phone_number: string;

    @ApiProperty()
    @IsString()
    allergy: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    gender : number;

    @ApiProperty({
        format:"date"
    })
    @IsString()
    @IsNotEmpty()
    date_of_birth: Date;



    













}