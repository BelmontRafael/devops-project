import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ScheduleModule } from "@nestjs/schedule";
import { RegistrationsService } from "./registrations.service";
import { RegistrationsController } from "./registrations.controller";
import { RegistrationsRepotisory } from "./registrations.repository";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { UserActivityModule } from "src/user-activity/user-activity.module";
import { AutoCancelTask } from "./tasks/auto-cancel.task";

@Module({
  imports: [
    SequelizeModule.forFeature(models),
    AuthModule,
    UserActivityModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [RegistrationsController],
  providers: [RegistrationsService, RegistrationsRepotisory, AutoCancelTask],
})
export class RegistrationsModule {}
