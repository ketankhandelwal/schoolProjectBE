import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UPDATESTAFFDTO {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id:number



  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  profile_photo: string;



  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  salary: number;
}
