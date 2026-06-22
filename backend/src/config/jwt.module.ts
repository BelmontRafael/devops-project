import { Global, Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";

@Global()
@Module({
  imports: [
    NestJwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: Number(process.env.JWT_TTL) || 3600,
          audience: process.env.JWT_TOKEN_AUDIENCE,
          issuer: process.env.JWT_TOKEN_ISSUER,
        },
      }),
    }),
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}
