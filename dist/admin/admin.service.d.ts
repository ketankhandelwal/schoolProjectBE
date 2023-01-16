import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
export declare class AdminService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    createSubAdmin(payload: any, data: any): Promise<boolean>;
    updateSubAdminDetails(payload: any, data: any): Promise<boolean>;
    getSubAdminDetails(id: any): Promise<{
        res: import(".prisma/client").Admin;
    }>;
    deleteSubAdmin(id: any): Promise<boolean>;
}
