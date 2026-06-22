import { Module } from "@nestjs/common";
import { LessonProgressService } from "./lesson-progress.service";
import { LessonProgressController } from "./lesson-progress.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { LessonProgressRepository } from "./lesson-progress.repository";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule, UserActivityModule],
  controllers: [LessonProgressController],
  providers: [LessonProgressService, LessonProgressRepository],
})
export class LessonProgressModule {}
