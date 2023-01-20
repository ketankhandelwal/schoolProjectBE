import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsSemVer, IsString } from "class-validator";

export class ADDSTAFFLEAVESDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    staff_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    leave_type:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    leave_from:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    leave_to:string;



}