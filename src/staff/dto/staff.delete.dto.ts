import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DELETESTAFFDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    status : number;
}