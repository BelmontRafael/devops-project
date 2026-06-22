import { Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "src/auth/auth.module";
import { LessonsRepository } from "./lessons.repository";
import { models } from "src/models";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule, UserActivityModule],
  controllers: [LessonsController],
  providers: [LessonsService, LessonsRepository],
})
export class LessonsModule {}
