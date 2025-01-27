import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async validateUser(user: AuthDto) {
    const userPromise = await this.usersService.findByEmail(user.email);
    if (
      !userPromise ||
      !( compareSync(user.password, userPromise.password))
    ) {
      throw new UnauthorizedException();
    }
    return userPromise;
  }
  async signIn(user: UserEntity) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
