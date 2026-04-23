import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/repository/users.repository';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { UserRole } from '../../common/constants/user-role.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepo.findOne('e.email = :email', {
      email: dto.email,
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

    const tokens = await this.generateTokens(user.id, user.role);

    return tokens;
  }

  async generateTokens(userId: string, role: UserRole) {
    const payload = { sub: userId, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<StringValue>('JWT_ACCESS_EXPIRES'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn:
        this.configService.get<StringValue>('JWT_REFRESH_EXPIRES') || '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
