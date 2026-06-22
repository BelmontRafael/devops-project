import { forwardRef, Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthUsersService } from "./auth-users.service";
import { HashService } from "./hash/hash.service";
import { BcryptService } from "./hash/bcrypt.service";
import { JwtModule } from "src/config/jwt.module";

@Module({
  imports: [forwardRef(() => UsersModule), JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthUsersService,
    {
      provide: HashService,
      useClass: BcryptService,
    },
  ],
  exports: [HashService, JwtModule, AuthUsersService],
})
export class AuthModule {}
