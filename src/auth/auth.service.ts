import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(email: string): Promise<any> {
    const payload = {
      email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
