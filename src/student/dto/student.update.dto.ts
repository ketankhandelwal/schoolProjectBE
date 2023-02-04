import { ApiProperty } from "@nestjs/swagger";
import { int } from "aws-sdk/clients/datapipeline";
import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UPDATESTUDENTDTO {

@ApiProperty()
@IsNumber()
@IsNotEmpty()
id:number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    class_id : number;

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
    emergency_phone_number: string;

    @ApiProperty()
    @IsString()
    profile_photo: string;

    @ApiProperty()
    @IsString()
    allergy: string;



    













}