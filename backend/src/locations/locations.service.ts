import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { LocationsRepository } from "./locations.repository";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { FindLocationsQueryDto } from "./dto/find-locations-query.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { CREATED_LOCATION_MESSAGE, DELETED_LOCATION_MESSAGE, NOT_FOUND_LOCATION_MESSAGE, UPDATED_LOCATION_MESSAGE } from "./locations.contants";


@Injectable()
export class LocationsService {
  constructor(private readonly locationsRepository: LocationsRepository) {}

  async create(
    createLocationDto: CreateLocationDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const locationData = {
      ...createLocationDto,
    };

    const location = await this.locationsRepository.create(locationData);
    return {
      message: CREATED_LOCATION_MESSAGE,
      location,
    };
  }

  async findAll(findLocationsQuery: FindLocationsQueryDto) {
    return await this.locationsRepository.findAll(findLocationsQuery);
  }

  async findOne(id: string) {
    const location = await this.locationsRepository.findById(id);
    if (!location) throw new NotFoundException(NOT_FOUND_LOCATION_MESSAGE);
    return location;
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const location = await this.locationsRepository.findById(id);
    if (!location) throw new NotFoundException(NOT_FOUND_LOCATION_MESSAGE);

    const updatedLocation = await this.locationsRepository.update(
      id,
      updateLocationDto
    );
    return {
      message: UPDATED_LOCATION_MESSAGE,
      location: updatedLocation,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const location = await this.locationsRepository.findById(id);
    if (!location) throw new NotFoundException(NOT_FOUND_LOCATION_MESSAGE);

    await this.locationsRepository.delete(id);
    return {
      message: DELETED_LOCATION_MESSAGE,
    };
  }
}
