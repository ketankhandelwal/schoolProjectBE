import { CREATESTAFFDTO } from "./dto/staff.create.dto";
import { DELETESTAFFDTO } from "./dto/staff.delete.dto";
import { ADDSTAFFLEAVESDTO } from "./dto/staff.leaves.dto";
import { UPDATESTAFFDTO } from "./dto/staff.update.dto";
import { StaffService } from "./staff.service";
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    findAll(page: number, count: number, search: string, gender: number, subject: string, role: number, start_date: string, end_date: string, order_by: string): Promise<any>;
    addStudent(data: CREATESTAFFDTO, req: any): Promise<boolean>;
    updateStudent(data: UPDATESTAFFDTO, req: any): Promise<boolean>;
    getStudentDetails(id: any): Promise<{
        res: import(".prisma/client").Staff;
    }>;
    deleteStudent(data: DELETESTAFFDTO): Promise<boolean>;
    saveStudentFee(data: ADDSTAFFLEAVESDTO, req: any): Promise<true | import(".prisma/client").StaffLeaves>;
    getStudentFeesDetails(id: number, month: number, year: number, req: any): Promise<{
        res: {
            staffTotalLeave: import(".prisma/client").Prisma.GetStaffLeavesAggregateType<{
                _sum: {
                    leave_count: true;
                };
                where: {
                    staff_id: number;
                };
            }>;
            staffLeavesInParticularMonth: import(".prisma/client").StaffLeaves[];
        };
    }>;
}
