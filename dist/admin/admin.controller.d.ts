import { AdminService } from "./admin.service";
import { UpdateAdminChangePasswordDto } from "./dto/admin.changePassword.dto";
import { CREATESUBADMINDTO } from "./dto/admin.create.subAdmin.dto";
import { UpdateAdminDto } from "./dto/admin.update.dto";
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
    getAdminDetails(req: any): Promise<{
        res: import(".prisma/client").Admin;
    }>;
    adminChangePassword(data: UpdateAdminChangePasswordDto, req: any): Promise<{
        message: any;
    }>;
    update(data: UpdateAdminDto, req: any): Promise<any>;
}
