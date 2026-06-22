import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SermonsService } from "./sermons.service";
import { SermonsController } from "./sermons.controller";
import { SermonsRepository } from "./sermons.repository";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule, UserActivityModule],
  controllers: [SermonsController],
  providers: [SermonsService, SermonsRepository],
})
export class SermonsModule {}
