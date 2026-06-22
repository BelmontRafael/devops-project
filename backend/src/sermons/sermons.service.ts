import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSermonDto } from "./dto/create-sermon.dto";
import { UpdateSermonDto } from "./dto/update-sermon.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { SermonsRepository } from "./sermons.repository";
import { USER_ADMIN_ROLE } from "src/users/user.constants";

import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import {
  CREATED_SERMON_MESSAGE,
  UPDATED_SERMON_MESSAGE,
  DELETED_SERMON_MESSAGE,
  NOT_FOUND_SERMON,
} from "./sermons.constants";
import { FindSermonQueryDto } from "./dto/find-sermon-query.dto";

@Injectable()
export class SermonsService {
  constructor(private readonly SermonRepository: SermonsRepository) {}

  async create(
    createSermonDto: CreateSermonDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const createdSermon = await this.SermonRepository.create(createSermonDto);

    return {
      message: CREATED_SERMON_MESSAGE,
      sermon: createdSermon,
    };
  }

  async findAll(query: FindSermonQueryDto) {
    const sermons = await this.SermonRepository.findAll(query);

    return sermons;
  }

  async findOne(id: string) {
    const sermon = await this.SermonRepository.findById(id);

    if (!sermon) {
      throw new NotFoundException(NOT_FOUND_SERMON);
    }

    return sermon;
  }

  async update(
    id: string,
    updateSermonDto: UpdateSermonDto,
    tokenPayload: TokenPayloadDto
  ) {
    const sermonExists = this.SermonRepository.findById(id);

    if (!sermonExists) {
      throw new NotFoundException(NOT_FOUND_SERMON);
    }

    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const updatedSermon = await this.SermonRepository.update(
      id,
      updateSermonDto
    );

    return {
      message: UPDATED_SERMON_MESSAGE,
      sermon: updatedSermon,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const sermonExists = this.SermonRepository.findById(id);

    if (!sermonExists) {
      throw new NotFoundException(NOT_FOUND_SERMON);
    }

    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    await this.SermonRepository.delete(id);

    return {
      message: DELETED_SERMON_MESSAGE,
    };
  }
}
