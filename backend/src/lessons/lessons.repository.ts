import { InjectModel } from "@nestjs/sequelize";
import { Lesson } from "src/models";
import { FindLessonQueryDto } from "./dto/find-lesson-query.dto";

export class LessonsRepository {
  constructor(
    @InjectModel(Lesson)
    private readonly lessonModel: typeof Lesson
  ) {}

  async create(data) {
    const createdLesson = await this.lessonModel.create(data);

    return createdLesson;
  }

  async findAll(findLessonQuery: FindLessonQueryDto) {
    const { sermonId ,page, limit, orderBy, orderDirection } = findLessonQuery;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.lessonModel.findAndCountAll({
      where: { sermonId },
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
    const lesson = await this.lessonModel.findByPk(id);

    return lesson;
  }

  async update(id: string, data) {
    const lesson = await this.findById(id);

    return await lesson!.update(data);
  }

  async delete(id: string) {
    const lesson = await this.findById(id);
    await lesson!.destroy();

    return;
  }
}
