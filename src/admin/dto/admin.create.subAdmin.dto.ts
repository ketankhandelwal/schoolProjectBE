import {
    IsEmail,
    IsString,
    IsNotEmpty,
    IsNumber,
    IsArray,
  } from "class-validator";
  import { ApiProperty } from "@nestjs/swagger";
 
  export class CREATESUBADMINDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    
    @IsNotEmpty()
    password: string;


  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone_number: string;
  
    @ApiProperty()
    @IsString()
    
    profile_photo: string;
  
    @ApiProperty({
      example: [
        { id: 1, status: 2, name: "Student Management" },
        { id: 2, status: 2, name: "Staff management" },
   
        { id: 3, status: 2, name: "subadmin management" }
      ],
    })
    @IsArray()
    @IsNotEmpty()
    permission: number;


    @ApiProperty()
    @IsString()
    designation: string;

    @ApiProperty({
        default:2
    })
    @IsNumber()
    @IsNotEmpty()
    role: number



  }
  