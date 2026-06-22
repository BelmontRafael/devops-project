import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectModel } from "@nestjs/sequelize";
import { Registration, Event } from "src/models";
import { Op } from "sequelize";
import { RegistrationStatus } from "../types/registration.types";

@Injectable()
export class AutoCancelTask {
  constructor(
    @InjectModel(Registration)
    private readonly registrationModel: typeof Registration,
    @InjectModel(Event)
    private readonly eventModel: typeof Event
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handle() {
    const now = new Date();

    const pastEvents = await this.eventModel.findAll({
      where: { endDate: { [Op.lt]: now } },
    });

    const eventIds = pastEvents.map((e) => e.id);

    const [count] = await this.registrationModel.update(
      { status: RegistrationStatus.CANCELED },
      {
        where: {
          eventId: eventIds,
          status: { [Op.ne]: RegistrationStatus.CANCELED },
        },
      }
    );

    console.log(`${count} inscrições canceladas automaticamente.`);
  }
}
