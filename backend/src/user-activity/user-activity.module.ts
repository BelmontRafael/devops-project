import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";

import { UserActivity } from "./entities/user-activity.model";
import { UserActivityService } from "./user-activity.service";
import { UserActivityRepository } from "./user-activity.repository";
import { UserActivityController } from "./user-activity.controller";

@Module({
  imports: [
    SequelizeModule.forFeature([UserActivity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserActivityController],
  providers: [UserActivityService, UserActivityRepository],
  exports: [UserActivityService],
})
export class UserActivityModule {}
