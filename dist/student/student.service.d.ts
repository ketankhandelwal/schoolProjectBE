import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
export declare class StudentService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    addStudentDetails(payload: any, data: any): Promise<boolean>;
    updateStudentDetails(payload: any, data: any): Promise<boolean>;
    getStudentDetails(id: any): Promise<{
        res: import(".prisma/client").Student;
    }>;
    deleteStudent(id: any): Promise<boolean>;
    getStudentFeesDetails(id: any, year: any): Promise<{
        res: {
            totalActions: number;
            response: any;
        };
    }>;
    saveStudentFees(data: any, payload: any): Promise<import(".prisma/client").Prisma.BatchPayload | import(".prisma/client").StudentFees>;
    saveStudentFeesInBulk(data: any, payload: any): Promise<boolean>;
    findAll(data: any): Promise<{
        res: {
            count: number;
            data: import(".prisma/client").Student[];
        };
    }>;
}
