import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CREATESTAFFDTO {
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
  previous_organization: string;

  @ApiProperty()
  @IsString()
  subject_speciality: string;

  @ApiProperty()
  @IsString()
  last_qualification: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  role: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  salary: number;

  @ApiProperty()
  @IsNotEmpty()
  YOE: number;

  @ApiProperty()
  @IsNumber()
  class_teacher: number;

  @ApiProperty()
  @IsString()
  section:string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  gender: number;

  @ApiProperty({
    format: "date",
  })
  @IsString()
  @IsNotEmpty()
  date_of_birth: Date;
}
