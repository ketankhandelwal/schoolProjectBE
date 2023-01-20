import { JwtService } from "@nestjs/jwt";
import { Admin, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { UpdateAdminDto } from "./dto/admin.update.dto";
export declare class AdminService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    createSubAdmin(payload: any, data: any): Promise<boolean>;
    updateSubAdminDetails(payload: any, data: any): Promise<boolean>;
    getAdminDetails(id: any): Promise<{
        res: Admin;
    }>;
    getSubAdminDetails(id: any): Promise<{
        res: Admin;
    }>;
    deleteSubAdmin(id: any): Promise<boolean>;
    update(id: number, request: UpdateAdminDto): Promise<Prisma.BatchPayload>;
    findById(AdminWhereUniqueInput: Prisma.AdminWhereUniqueInput): Promise<Admin | null>;
    changePassword(user: any, userDetails: any): Promise<{
        message: any;
    }>;
    updateAdmin(reqData: any, id: any): Promise<Prisma.BatchPayload>;
}
