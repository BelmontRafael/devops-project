import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LikesController } from "./likes.controller";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { SequelizeModule } from "@nestjs/sequelize";
import { LikesRepository } from "./likes.repository";
import { PostsModule } from "src/posts/posts.module";
import { UsersModule } from "src/users/users.module";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [
    SequelizeModule.forFeature(models),
    AuthModule,
    PostsModule,
    UsersModule,
    UserActivityModule,
  ],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}
