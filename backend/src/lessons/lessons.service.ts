import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { LessonsRepository } from "./lessons.repository";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { FindLessonQueryDto } from "./dto/find-lesson-query.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import {
  NOT_FOUND_LESSON,
  CREATED_LESSON_MESSAGE,
  UPDATED_LESSON_MESSAGE,
  DELETED_LESSON_MESSAGE,
} from "./lessons.constants";

@Injectable()
export class LessonsService {
  constructor(private readonly LessonRepository: LessonsRepository) {}

  async create(
    createLessonDto: CreateLessonDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const createdLesson = await this.LessonRepository.create(createLessonDto);

    return {
      message: CREATED_LESSON_MESSAGE,
      sermon: createdLesson,
    };
  }

  async findAll(query: FindLessonQueryDto) {
    const lessons = await this.LessonRepository.findAll(query);

    return lessons;
  }

  
  async findOne(id: string) {
    const lesson = await this.LessonRepository.findById(id);

    if (!lesson) {
      throw new NotFoundException(NOT_FOUND_LESSON);
    }

    return lesson;
  }

  async update(
    id: string,
    updateLessonDto: UpdateLessonDto,
    tokenPayload: TokenPayloadDto
  ) {
    const LessonExists = this.LessonRepository.findById(id);

    if (!LessonExists) {
      throw new NotFoundException(NOT_FOUND_LESSON);
    }

    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const updatedLesson = await this.LessonRepository.update(
      id,
      updateLessonDto
    );

    return {
      message: UPDATED_LESSON_MESSAGE,
      lesson: updatedLesson,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const lessonExists = this.LessonRepository.findById(id);

    if (!lessonExists) {
      throw new NotFoundException(NOT_FOUND_LESSON);
    }

    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    await this.LessonRepository.delete(id);

    return {
      message: DELETED_LESSON_MESSAGE,
    };
  }
}
