import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { EventsRepository } from "./events.repository";
import { FindEventsQueryDto } from "./dto/find-events-query.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import {
  CREATED_EVENT_MESSAGE,
  DELETED_EVENT_MESSAGE,
  NOT_FOUND_EVENT_MESSAGE,
  UPDATED_EVENT_MESSAGE,
} from "./events.constants";

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async create(createEventDto: CreateEventDto, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const eventData = {
      ...createEventDto,
      createdBy: tokenPayload.id,
    };

    const event = await this.eventsRepository.create(eventData);
    return {
      message: CREATED_EVENT_MESSAGE,
      event,
    };
  }

  async findAll(findEventsQuery: FindEventsQueryDto) {
    return await this.eventsRepository.findAll(findEventsQuery);
  }

  async findOne(id: string) {
    const event = await this.eventsRepository.findById(id);
    return event;
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const event = await this.eventsRepository.findById(id);
    if (!event) throw new NotFoundException(NOT_FOUND_EVENT_MESSAGE);

    const updatedEvent = await this.eventsRepository.update(id, updateEventDto);
    return {
      message: UPDATED_EVENT_MESSAGE,
      event: updatedEvent,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const event = await this.eventsRepository.findById(id);
    if (!event) throw new NotFoundException(NOT_FOUND_EVENT_MESSAGE);

    await this.eventsRepository.delete(id);
    return {
      message: DELETED_EVENT_MESSAGE,
    };
  }
}
