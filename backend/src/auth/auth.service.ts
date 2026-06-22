import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UsersRepository } from "src/users/users.repository";
import { UnauthorizedException } from "@nestjs/common";
import { HashService } from "./hash/hash.service";
import { JwtService } from "@nestjs/jwt";
import { UNAUTHORIZED_EMAIL_PASSWORD_MESSAGE } from "./auth.constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findByEmail(loginDto.email);
    if (!user || !user.active)
      throw new UnauthorizedException(UNAUTHORIZED_EMAIL_PASSWORD_MESSAGE);

    const isValidPassword = await this.hashService.compare(
      loginDto.password,
      user.password
    );
    if (!isValidPassword)
      throw new UnauthorizedException(UNAUTHORIZED_EMAIL_PASSWORD_MESSAGE);

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
        expiresIn: Number(process.env.JWT_TTL) || 3600,
      }
    );

    return {
      token,
      name: user.name,
      email: user.email,
    };
  }
}
