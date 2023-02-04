import { JwtService } from "@nestjs/jwt";
import { Admin, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { UpdateAdminDto } from "./dto/admin.update.dto";
export declare class AdminService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    createSubAdmin(payload: any, data: any): Promise<{
        res: Admin;
    }>;
    updateSubAdminDetails(payloadData: any, reqData: any): Promise<{
        res: {
            userDeatils: Admin;
            permission: import(".prisma/client").SubAdminPermission[];
            messgae: string;
        };
    }>;
    getAdminDetails(id: any): Promise<{
        res: Admin;
    }>;
    getSubAdminDetails(id: any): Promise<{
        res: any;
    }>;
    deleteSubAdmin(id: any): Promise<boolean>;
    update(id: number, request: UpdateAdminDto): Promise<Prisma.BatchPayload>;
    findById(AdminWhereUniqueInput: Prisma.AdminWhereUniqueInput): Promise<Admin | null>;
    changePassword(user: any, userDetails: any): Promise<{
        message: any;
    }>;
    updateAdmin(reqData: any, id: any): Promise<Prisma.BatchPayload>;
    getSubAdminList(data: any, request: any): Promise<{
        res: {
            count: number;
            finalData: Admin[];
        };
    }>;
    getPermissionList(id: any): Promise<{
        res: {
            subAdminPermission: any;
        };
    }>;
}
