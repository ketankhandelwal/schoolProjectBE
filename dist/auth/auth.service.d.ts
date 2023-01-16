import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
export declare class AuthService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    validateAdmin(data: any): Promise<any>;
    adminLogin(user: any, role: any): Promise<{
        res: {
            user_details: any;
            access_token: string;
        };
    }>;
}
