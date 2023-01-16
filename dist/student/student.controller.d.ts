import { ADDBULKFEESDTO } from "./dto/student.addBulkFees.dto";
import { ADDSTUDENTFEEDTO } from "./dto/student.addFee.dto";
import { STUDENTCREATEDTO } from "./dto/student.create.dto";
import { UPDATESTUDENTDTO } from "./dto/student.update.dto";
import { StudentService } from "./student.service";
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    addStudent(data: STUDENTCREATEDTO, req: any): Promise<boolean>;
    updateStudent(data: UPDATESTUDENTDTO, req: any): Promise<boolean>;
    getStudentDetails(id: any): Promise<{
        res: import(".prisma/client").Student;
    }>;
    deleteStudent(id: any): Promise<boolean>;
    getStudentFeesDetails(id: number, year: number, req: any): Promise<{
        res: {
            totalActions: number;
            response: any;
        };
    }>;
    saveStudentFeesInBulk(data: ADDBULKFEESDTO, req: any): Promise<boolean>;
    saveStudentFee(data: ADDSTUDENTFEEDTO, req: any): Promise<import(".prisma/client").Prisma.BatchPayload | import(".prisma/client").StudentFees>;
    findAll(page: number, count: number, search: string, gender: number, classes: number, start_date: string, end_date: string, order_by: string): Promise<any>;
}
