import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { models } from "src/models";
import { EventFeedbacksService } from "./event-feedbacks.service";
import { EventFeedbacksController } from "./event-feedbacks.controller";
import { EventFeedbacksRepository } from "./event-feedbacks.repository";
import { EventsModule } from "src/events/events.module";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [
    SequelizeModule.forFeature(models),
    AuthModule,
    EventsModule,
    UserActivityModule,
  ],
  controllers: [EventFeedbacksController],
  providers: [EventFeedbacksService, EventFeedbacksRepository],
})
export class EventFeedbacksModule {}
