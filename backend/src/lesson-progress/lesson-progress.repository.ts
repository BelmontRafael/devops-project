import { InjectModel } from "@nestjs/sequelize";
import { LessonProgress } from "src/models";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLessonProgressDto } from "./dto/find-lesson-progress-query.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LessonProgressRepository {
  constructor(
    @InjectModel(LessonProgress)
    private readonly lessonProgressModel: typeof LessonProgress
  ) {}

  async create(data) {
    return await this.lessonProgressModel.create(data);
  }

  async findAll(
    tokenPayload: TokenPayloadDto,
    findLessonProgressDto: FindLessonProgressDto
  ) {
    const { page, limit, orderBy, orderDirection, lessonId } =
      findLessonProgressDto;
    const offset = (page - 1) * limit;
    const userId = tokenPayload.id;

    const where: any = { userId };
    if (lessonId) where.lessonId = lessonId;

    const { rows, count } = await this.lessonProgressModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      lessons: rows,
    };
  }

  async findById(id: string) {
    return await this.lessonProgressModel.findByPk(id);
  }

  async findByLessonAndUser(lessonId: string, userId: string) {
    return await this.lessonProgressModel.findOne({
      where: { lessonId, userId },
    });
  }

  async update(id: string, data: any) {
    const lesson = await this.findById(id);
    if (!lesson) return null;

    return await lesson.update(data);
  }

  async delete(id: string) {
    const lesson = await this.findById(id);
    if (!lesson) return null;

    await lesson.destroy();
  }
}
