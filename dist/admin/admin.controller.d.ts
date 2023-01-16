import { AdminService } from "./admin.service";
import { CREATESUBADMINDTO } from "./dto/admin.create.subAdmin.dto";
import { UPDATESUBADMINDTO } from "./dto/admin.update.subAdmin.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createSubAdmin(data: CREATESUBADMINDTO, req: any): Promise<boolean>;
    updateSubAdmin(data: UPDATESUBADMINDTO, req: any): Promise<boolean>;
    getStudentDetails(id: any): Promise<{
        res: import(".prisma/client").Admin;
    }>;
    deleteStudent(id: any): Promise<boolean>;
}
