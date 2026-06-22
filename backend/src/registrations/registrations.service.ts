import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRegistrationDto } from "./dto/create-registration.dto";
import { UpdateRegistrationDto } from "./dto/update-registration.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { RegistrationsRepotisory } from "./registrations.repository";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { FindRegistrationsQueryDto } from "./dto/find-registrations-query.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import {
  CANCEL_REGISTRATION_MESSAGE,
  CREATE_REGISTRATION_CONFLICT_MESSAGE,
  CREATED_REGISTRATION_MESSAGE,
  EVENT_FULL_MESSAGE,
  EVENT_OR_LOCATION_NOT_FOUND_MESSAGE,
  NOT_FOUND_REGISTRATION_MESSAGE,
  UPDATED_REGISTRATION_MESSAGE,
} from "./registrations.constants";

@Injectable()
export class RegistrationsService {
  constructor(
    private readonly registrationRepository: RegistrationsRepotisory
  ) {}

  async create(
    createRegistrationDto: CreateRegistrationDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      createRegistrationDto.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const existing = await this.registrationRepository.findByUserAndEvent(
      createRegistrationDto.userId,
      createRegistrationDto.eventId
    );
    if (existing)
      throw new ConflictException(CREATE_REGISTRATION_CONFLICT_MESSAGE);

    const event = await this.registrationRepository.findEventWithLocation(
      createRegistrationDto.eventId
    );

    if (!event || !event.locationId) {
      throw new NotFoundException(EVENT_OR_LOCATION_NOT_FOUND_MESSAGE);
    }

    const currentCount = await this.registrationRepository.countActiveByEvent(
      createRegistrationDto.eventId
    );

    if (currentCount >= event.location.capacity) {
      throw new ConflictException(EVENT_FULL_MESSAGE);
    }

    const createdRegistration = await this.registrationRepository.create(
      createRegistrationDto
    );

    return {
      message: CREATED_REGISTRATION_MESSAGE,
      registration: createdRegistration,
    };
  }

  async findAll(
    tokenPayload: TokenPayloadDto,
    findRegistrationsQuery: FindRegistrationsQueryDto
  ) {
    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      findRegistrationsQuery.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const registrations = await this.registrationRepository.findAll(
      findRegistrationsQuery
    );
    return registrations;
  }

  async findOne(id: string, tokenPayload: TokenPayloadDto) {
    const registration = await this.registrationRepository.findById(id);
    if (!registration) {
      throw new NotFoundException(NOT_FOUND_REGISTRATION_MESSAGE);
    }

    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      registration.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    return registration;
  }

  async update(
    id: string,
    updateRegistrationDto: UpdateRegistrationDto,
    tokenPayload: TokenPayloadDto
  ) {
    const registrationExists = await this.registrationRepository.findById(id);
    if (!registrationExists)
      throw new NotFoundException(NOT_FOUND_REGISTRATION_MESSAGE);

    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      registrationExists.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const updatedRegistration = await this.registrationRepository.update(
      id,
      updateRegistrationDto
    );
    return {
      message: UPDATED_REGISTRATION_MESSAGE,
      registration: updatedRegistration,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const registrationExists = await this.registrationRepository.findById(id);
    if (!registrationExists)
      throw new NotFoundException(NOT_FOUND_REGISTRATION_MESSAGE);

    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      registrationExists.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    await this.registrationRepository.delete(id);
    return {
      message: CANCEL_REGISTRATION_MESSAGE,
    };
  }
}
