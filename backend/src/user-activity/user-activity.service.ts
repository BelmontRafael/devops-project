import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserActivityDto } from "./dto/create-user-activity.dto";
import { FindUserActivityQueryDto } from "./dto/find-user-activity-query.dto";
import { UserActivityRepository } from "./user-activity.repository";
import {
  CREATED_USER_ACTIVITY_MESSAGE,
  NOT_FOUND_USER_ACTIVITY_MESSAGE,
} from "./user-activity.constants";

@Injectable()
export class UserActivityService {
  constructor(
    private readonly userActivityRepository: UserActivityRepository
  ) {}

  async logActivity(
    userId: string,
    method: string,
    endpoint: string,
    entityId?: string | null,
    description?: string
  ) {
    try {
      await this.userActivityRepository.create({
        userId,
        action: method,
        endpoint,
        description,
      });
    } catch (error) {
      console.error("Erro ao registrar atividade do usuário:", error);
    }
  }

  async create(createDto: CreateUserActivityDto) {
    const created = await this.userActivityRepository.create(createDto);
    return {
      message: CREATED_USER_ACTIVITY_MESSAGE,
      activity: created,
    };
  }

  async findAll(query: FindUserActivityQueryDto) {
    return await this.userActivityRepository.findAll(query);
  }

  async findOne(id: string) {
    const activity = await this.userActivityRepository.findById(id);
    if (!activity) {
      throw new NotFoundException(NOT_FOUND_USER_ACTIVITY_MESSAGE);
    }
    return activity;
  }

  async remove(id: string) {
    const activity = await this.userActivityRepository.findById(id);
    if (!activity) {
      throw new NotFoundException(NOT_FOUND_USER_ACTIVITY_MESSAGE);
    }
    await this.userActivityRepository.delete(id);
    return { message: "Atividade removida com sucesso." };
  }
}
