import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/auth.create.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    adminLogin(req: CreateAuthDto): Promise<{
        res: {
            user_details: any;
            access_token: string;
        };
    }>;
}
