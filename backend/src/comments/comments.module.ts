import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { CommentsRepository } from "./comments.repository";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
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
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
