import { PrismaService } from '../prisma.service';
import { UpdateSubadminpermissionDto } from './dto/subadminpermission.update.dto';
import { SubAdminPermission, Prisma } from '@prisma/client';
export declare class SubadminpermissionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.SubAdminPermissionCreateInput): Promise<SubAdminPermission>;
    findById(SubAdminPermissionWhereUniqueInput: Prisma.SubAdminPermissionWhereUniqueInput): Promise<SubAdminPermission | null>;
    delete(request: any): Promise<Prisma.BatchPayload>;
    update(id: number, request: UpdateSubadminpermissionDto): Promise<Prisma.BatchPayload>;
    updateMany(request: any): Promise<Prisma.BatchPayload>;
    findAll(): Promise<{
        res: import(".prisma/client").Permission[];
    }>;
    findMany(data: any): Promise<SubAdminPermission[]>;
    convertBigintToString(obj: any): any;
}
