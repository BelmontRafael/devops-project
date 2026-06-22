import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LocationsService } from "./locations.service";
import { LocationsController } from "./locations.controller";
import { LocationsRepository } from "./locations.repository";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule, UserActivityModule],
  controllers: [LocationsController],
  providers: [LocationsService, LocationsRepository],
})
export class LocationsModule {}
