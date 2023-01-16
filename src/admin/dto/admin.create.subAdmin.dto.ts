import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CREATESUBADMINDTO {

    @ApiProperty()
    @IsString(

    )
    @IsNotEmpty()
    name : string;

    @ApiProperty()
    @IsString(

    )
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString(

    )
    @IsNotEmpty()
    designation:string;

    @ApiProperty()
    @IsString(

    )
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty()
    @IsString(

    )
    @IsNotEmpty()
    profile_photo: string;

    @ApiProperty()
    @IsString(

    )
    @IsNotEmpty()
    password:string




}