import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JwtPayload } from "../types/jwt.type";
import { UsersRepository } from './../../modules/users/repository/users.repository';
import { TokenRepository } from "../../modules/auth/reposatories/token.repository";
import { AuthRequest } from "../types/req.type";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public_decorator";




@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly UsersRepository: UsersRepository,
        private readonly _TokenRepository: TokenRepository,
        private readonly _reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if (isPublic) return true
        const request = context.switchToHttp().getRequest<AuthRequest>();
        const token = this.extractTokenFromHeader(request);
        if (!token) throw new UnauthorizedException();
        try {


            const payload = this.jwtService.verify<JwtPayload>(token, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET')
            });
            const user = await this.UsersRepository.findOne(
                'e.id = :id',
                { id: String(payload.id) }
            );
            if (!user) throw new UnauthorizedException("user not found");
            const tokenDoc = await this._TokenRepository.findOne(
                'e.token = :token AND e.isValid = :isValid AND e.userId = :userId',
                {

                    token: String(token).trim(),
                    isValid: true,
                    userId: user.id,
                }
            );
            request.user = user
            if (!tokenDoc) throw new UnauthorizedException("token not found");
        } catch (err) {
            if (err instanceof Error) {
                throw new UnauthorizedException(err.message);
            }
            throw new UnauthorizedException();
        }
        return true

    }


    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}