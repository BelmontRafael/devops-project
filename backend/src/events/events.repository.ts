import { InjectModel } from "@nestjs/sequelize";
import { Event } from "src/models";
import { CreateEvent, UpdateEvent } from "./types/event.types";
import { FindEventsQueryDto } from "./dto/find-events-query.dto";
import { Op } from "sequelize";

export class EventsRepository {
  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event
  ) {}

  async create(data: CreateEvent) {
    const createdEvent = await this.eventModel.create(data);

    return createdEvent;
  }

  async findAll(findEventsQuery: FindEventsQueryDto) {
    const {
      page,
      limit,
      title,
      startDate,
      endDate,
      createdBy,
      orderBy,
      orderDirection,
    } = findEventsQuery;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (title) where.title = { [Op.iLike]: `%${title}%` };
    if (createdBy) where.createdBy = createdBy;
    if (startDate && endDate) {
      where.startDate = { [Op.between]: [startDate, endDate] };
    } else if (startDate) {
      where.startDate = { [Op.gte]: startDate };
    } else if (endDate) {
      where.startDate = { [Op.lte]: endDate };
    }

    const { rows, count } = await this.eventModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      events: rows,
    };
  }

  async findById(id: string) {
    const event = await this.eventModel.findByPk(id);

    return event;
  }

  async update(id: string, data: UpdateEvent) {
    const event = await this.findById(id);

    return await event!.update(data);
  }

  async delete(id: string) {
    const event = await this.findById(id);
    await event!.destroy();

    return;
  }
}
