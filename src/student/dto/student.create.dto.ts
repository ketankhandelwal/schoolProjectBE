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
    age : number;

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
    previous_school: string;

    @ApiProperty()
    @IsString()
    emergency_phone_number: string;

    @ApiProperty()
    @IsString()
    profile_photo: string;

    @ApiProperty()
    @IsString()
    allergy: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    gender : int;

    













}