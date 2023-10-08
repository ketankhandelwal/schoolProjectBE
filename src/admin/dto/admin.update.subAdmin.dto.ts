import { IsString, IsNotEmpty, IsNumber, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UPDATESUBADMINDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    example: [
      { permission_id: 1, status: 2 },
      { permission_id: 2, status: 2 },
      { permission_id: 3, status: 2 },
      { permission_id: 4, status: 2 },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  permission: number;

  @ApiProperty()
  @IsString()
  designation: string;
}
