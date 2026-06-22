import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { EventFeedbacksRepository } from "./event-feedbacks.repository";
import { CreateEventFeedbackDto } from "./dto/create-event-feedback.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindEventFeedbacksQueryDto } from "./dto/find-event-feedbacks-query.dto";
import {
  CREATE_EVENT_FEEDBACK_CONFLICT_MESSAGE,
  CREATED_EVENT_FEEDBACK_MESSAGE,
  DELETED_EVENT_FEEDBACK_MESSAGE,
  NOT_FOUND_EVENT_FEEDBACK_MESSAGE,
} from "./event-feedbacks.constants";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { NOT_FOUND_EVENT_MESSAGE } from "src/events/events.constants";
import { EventsRepository } from "src/events/events.repository";

@Injectable()
export class EventFeedbacksService {
  constructor(
    private readonly eventFeedbacksRepository: EventFeedbacksRepository,
    private readonly eventRepository: EventsRepository
  ) {}

  async create(
    createEventFeedbackDto: CreateEventFeedbackDto,
    tokenPayload: TokenPayloadDto
  ) {
    const eventExists = await this.eventRepository.findById(
      createEventFeedbackDto.eventId
    );
    if (!eventExists) throw new NotFoundException(NOT_FOUND_EVENT_MESSAGE);

    const feedbackExists =
      await this.eventFeedbacksRepository.findByUserAndEvent(
        tokenPayload.id,
        createEventFeedbackDto.eventId
      );
    if (feedbackExists)
      throw new ConflictException(CREATE_EVENT_FEEDBACK_CONFLICT_MESSAGE);

    const feedbackData = {
      ...createEventFeedbackDto,
      userId: tokenPayload.id,
    };

    const feedback = await this.eventFeedbacksRepository.create(feedbackData);
    return {
      message: CREATED_EVENT_FEEDBACK_MESSAGE,
      feedback,
    };
  }

  async findAll(findEventFeedbacksQuery: FindEventFeedbacksQueryDto) {
    return await this.eventFeedbacksRepository.findAll(findEventFeedbacksQuery);
  }

  async findOne(id: string) {
    const feedback = await this.eventFeedbacksRepository.findById(id);
    if (!feedback)
      throw new NotFoundException(NOT_FOUND_EVENT_FEEDBACK_MESSAGE);
    return feedback;
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const feedback = await this.eventFeedbacksRepository.findById(id);
    if (!feedback) {
      throw new NotFoundException(NOT_FOUND_EVENT_FEEDBACK_MESSAGE);
    }

    if (feedback.userId !== tokenPayload.id) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    await this.eventFeedbacksRepository.delete(id);
    return {
      message: DELETED_EVENT_FEEDBACK_MESSAGE,
    };
  }
}
