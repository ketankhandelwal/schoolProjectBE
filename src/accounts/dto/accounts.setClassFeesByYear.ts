import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SETCLASSFEESBYYEAR {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  class_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  total_student: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  fees_per_student: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  total_months_fees_collected: number;
}
