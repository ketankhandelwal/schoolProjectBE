import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class ADDBULKFEESDTO{


    @ApiProperty({
        example: [
            {
                "student_id": 1,
                "month": 1,
                "fees_type": 1,
                "amount": 1000,
                "year":2023
            },
            {
                "student_id": 1,
                "month": 1,
                "fees_type": 2,
                "amount": 1000,
                "year":2023
            },
            {
                "student_id": 1,
                "month": 1,
                "fees_type": 3,
                "amount": 1000,
                "year":2023
            }
        ]
    })
    @IsArray()
    @IsNotEmpty()
    fees: number;
}


