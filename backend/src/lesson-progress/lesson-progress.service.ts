import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { LessonProgressRepository } from "./lesson-progress.repository";
import { CreateLessonProgressDto } from "./dto/create-lesson-progress.dto";
import { UpdateLessonProgressDto } from "./dto/update-lesson-progress.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { FindLessonProgressDto } from "./dto/find-lesson-progress-query.dto";
import {
  CREATED_PROGRESS_LESSON_MESSAGE,
  UPDATED_PROGRESS_LESSON_MESSAGE,
  DELETED_PROGRESS_LESSON_MESSAGE,
  NOT_FOUND_PROGRESS_LESSON,
  CREATE_PROGRESS_LESSON_CONFLICT_MESSAGE,
} from "./lesson-progress.constants";

@Injectable()
export class LessonProgressService {
  constructor(
    private readonly lessonProgressRepository: LessonProgressRepository
  ) {}

  async create(
    createLessonProgressDto: CreateLessonProgressDto,
    tokenPayload: TokenPayloadDto
  ) {
    const { userId, lessonId } = createLessonProgressDto;

    if (tokenPayload.id !== userId) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const existing = await this.lessonProgressRepository.findByLessonAndUser(
      lessonId,
      userId
    );

    if (existing)
      throw new ConflictException(CREATE_PROGRESS_LESSON_CONFLICT_MESSAGE);

    const createdProgress = await this.lessonProgressRepository.create({
      userId,
      lessonId,
    });

    return {
      message: CREATED_PROGRESS_LESSON_MESSAGE,
      progress: createdProgress,
    };
  }

  async findAll(
    tokenPayload: TokenPayloadDto,
    findLessonProgressDto: FindLessonProgressDto
  ) {
    return await this.lessonProgressRepository.findAll(
      tokenPayload,
      findLessonProgressDto
    );
  }

  async update(
    lessonId: string,
    updateLessonProgressDto: UpdateLessonProgressDto,
    tokenPayload: TokenPayloadDto
  ) {
    const userId = tokenPayload.id;

    const lessonProgress =
      await this.lessonProgressRepository.findByLessonAndUser(lessonId, userId);

    if (!lessonProgress) {
      throw new NotFoundException(NOT_FOUND_PROGRESS_LESSON);
    }

    const updatedProgress = await this.lessonProgressRepository.update(
      lessonProgress.id,
      updateLessonProgressDto
    );

    return {
      message: UPDATED_PROGRESS_LESSON_MESSAGE,
      progress: updatedProgress,
    };
  }

  async remove(lessonId: string, tokenPayload: TokenPayloadDto) {
    const userId = tokenPayload.id;

    const lessonProgress =
      await this.lessonProgressRepository.findByLessonAndUser(lessonId, userId);

    if (!lessonProgress) {
      throw new NotFoundException(NOT_FOUND_PROGRESS_LESSON);
    }

    await this.lessonProgressRepository.delete(lessonProgress.id);

    return { message: DELETED_PROGRESS_LESSON_MESSAGE };
  }
}
