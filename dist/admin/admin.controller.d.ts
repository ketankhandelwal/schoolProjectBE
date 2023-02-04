import { AdminService } from "./admin.service";
import { UpdateAdminChangePasswordDto } from "./dto/admin.changePassword.dto";
import { CREATESUBADMINDTO } from "./dto/admin.create.subAdmin.dto";
import { UpdateAdminDto } from "./dto/admin.update.dto";
import { UPDATESUBADMINDTO } from "./dto/admin.update.subAdmin.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createSubAdmin(data: CREATESUBADMINDTO, req: any): Promise<{
        res: import(".prisma/client").Admin;
    }>;
    updateSubAdmin(data: UPDATESUBADMINDTO, req: any): Promise<{
        res: {
            userDeatils: import(".prisma/client").Admin;
            permission: import(".prisma/client").SubAdminPermission[];
            messgae: string;
        };
    }>;
    getStudentDetails(id: any): Promise<{
        res: any;
    }>;
    deleteStudent(id: any): Promise<boolean>;
    getAdminDetails(req: any): Promise<{
        res: import(".prisma/client").Admin;
    }>;
    adminChangePassword(data: UpdateAdminChangePasswordDto, req: any): Promise<{
        message: any;
    }>;
    update(data: UpdateAdminDto, req: any): Promise<any>;
    getSubAdminList(page: number, count: number, search: string, start_date: string, end_date: string, req: any): Promise<{
        res: {
            count: number;
            finalData: import(".prisma/client").Admin[];
        };
    }>;
    getPermissionList(id: any, req: any): Promise<any>;
}
