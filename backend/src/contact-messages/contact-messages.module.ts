import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ContactMessagesService } from "./contact-messages.service";
import { ContactMessagesController } from "./contact-messages.controller";
import { ContactMessagesRepository } from "./contact-messages.repository";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule, UserActivityModule],
  controllers: [ContactMessagesController],
  providers: [ContactMessagesService, ContactMessagesRepository],
})
export class ContactMessagesModule {}
