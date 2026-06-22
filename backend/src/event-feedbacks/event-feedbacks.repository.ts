import { InjectModel } from "@nestjs/sequelize";
import { EventFeedback } from "src/models";
import { CreateEventFeedback } from "./types/event-feedbacks.types";
import { FindEventFeedbacksQueryDto } from "./dto/find-event-feedbacks-query.dto";

export class EventFeedbacksRepository {
  constructor(
    @InjectModel(EventFeedback)
    private readonly eventFeedbackModel: typeof EventFeedback
  ) {}

  async create(data) {
    const createdFeedback = await this.eventFeedbackModel.create(data);
    return createdFeedback;
  }

  async findById(id: string) {
    const eventFeedback = await this.eventFeedbackModel.findByPk(id);
    return eventFeedback;
  }

  async findByUserAndEvent(userId: string, eventId: string) {
    const eventFeedback = await this.eventFeedbackModel.findOne({
      where: {
        eventId,
        userId,
      },
    });

    return eventFeedback;
  }

  async findAll(findEventFeedbacksQuery: FindEventFeedbacksQueryDto) {
    const { page, limit, eventId, rating, orderBy, orderDirection } =
      findEventFeedbacksQuery;

    const offset = (page - 1) * limit;

    const where: any = {};
    if (eventId) where.eventId = eventId;
    if (rating) where.rating = rating;

    const { rows, count } = await this.eventFeedbackModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      feedbacks: rows,
    };
  }

  async delete(id: string) {
    const feedback = await this.eventFeedbackModel.findByPk(id);

    await feedback!.destroy();
    return feedback;
  }
}
