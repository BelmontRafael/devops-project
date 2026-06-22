import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [
    SequelizeModule.forFeature(models),
    forwardRef(() => AuthModule),
    UserActivityModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
