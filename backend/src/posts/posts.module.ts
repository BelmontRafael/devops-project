import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostsRepository } from "./posts.repository";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule, UserActivityModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsRepository],
})
export class PostsModule {}
