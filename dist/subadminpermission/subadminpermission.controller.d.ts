import { SubAdminPermission as subadminpermissionModel } from '@prisma/client';
import { SubadminpermissionService } from './subadminpermission.service';
import { UpdateSubadminpermissionDto } from './dto/subadminpermission.update.dto';
export declare class SubadminpermissionController {
    private readonly subadminpermissionService;
    constructor(subadminpermissionService: SubadminpermissionService);
    finadAll(): Promise<any>;
    getById(id: any): Promise<subadminpermissionModel>;
    create(data: any): Promise<subadminpermissionModel>;
    deletePost(request: any): Promise<any>;
    update(id: Number, request: UpdateSubadminpermissionDto): Promise<any>;
    updateMany(request: any): Promise<any>;
}
