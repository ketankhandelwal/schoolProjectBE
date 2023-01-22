import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
export declare class StaffService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    findAll(data: any): Promise<{
        res: {
            count: number;
            data: import(".prisma/client").Staff[];
        };
    }>;
    addStaffDetails(payload: any, data: any): Promise<boolean>;
    updateStaffDetails(payload: any, data: any): Promise<boolean>;
    getStaffDetails(id: any): Promise<{
        res: import(".prisma/client").Staff;
    }>;
    deleteStaff(data: any): Promise<boolean>;
    saveStaffLeaves(data: any, payload: any): Promise<true | import(".prisma/client").StaffLeaves>;
    getStaffLeaveDetails(data: any): Promise<{
        res: import(".prisma/client").StaffLeaves[];
    }>;
}
