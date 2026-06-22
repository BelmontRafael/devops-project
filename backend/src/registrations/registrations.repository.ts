import { InjectModel } from "@nestjs/sequelize";
import { Registration, Event, Location } from "src/models";
import { FindRegistrationsQueryDto } from "./dto/find-registrations-query.dto";

export class RegistrationsRepotisory {
  constructor(
    @InjectModel(Registration)
    private readonly registrationModel: typeof Registration,

    @InjectModel(Event)
    private readonly eventModel: typeof Event,

    @InjectModel(Location)
    private readonly locationModel: typeof Location
  ) {}

  async create(data) {
    const createdRegistration = await this.registrationModel.create(data);

    return createdRegistration;
  }

  async findAll(findRegistrationsQuery: FindRegistrationsQueryDto) {
    const { page, limit, userId, eventId, orderBy, orderDirection } =
      findRegistrationsQuery;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (userId) where.userId = userId;
    if (eventId) where.eventId = eventId;

    const { rows, count } = await this.registrationModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      registrations: rows,
    };
  }

  async findById(id: string) {
    const registration = await this.registrationModel.findByPk(id);

    return registration;
  }

  async findByUserId(userId: string) {
    const registrations = await this.registrationModel.findAll({
      where: {
        userId,
      },
    });

    return registrations;
  }

  async findByUserAndEvent(userId: string, eventId: string) {
    return this.registrationModel.findOne({
      where: { userId, eventId },
    });
  }

  async update(id: string, data) {
    const registration = await this.findById(id);

    return await registration!.update(data);
  }

  async delete(id: string) {
    const registration = await this.findById(id);
    await registration!.destroy();

    return;
  }

  async findEventWithLocation(eventId: string) {
    return this.eventModel.findByPk(eventId, {
      include: [{ model: this.locationModel }],
    });
  }

  async countActiveByEvent(eventId: string) {
    return this.registrationModel.count({
      where: {
        eventId,
        status: "confirmed",
      },
    });
  }
}
