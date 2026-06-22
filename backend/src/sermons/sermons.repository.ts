import { InjectModel } from "@nestjs/sequelize";
import { Sermon } from "src/models";
import { FindSermonQueryDto } from "./dto/find-sermon-query.dto";

export class SermonsRepository {
  constructor(
    @InjectModel(Sermon)
    private readonly sermonModel: typeof Sermon
  ) {}

  async create(data) {
    const createdSermon = await this.sermonModel.create(data);

    return createdSermon;
  }

  async findAll(findSermonQuery: FindSermonQueryDto) {
    const { page, limit, userId, orderBy, orderDirection } = findSermonQuery;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (userId) where.createdBy = userId;

    const { rows, count } = await this.sermonModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      sermons: rows,
    };
  }

  async findById(id: string) {
    const sermon = await this.sermonModel.findByPk(id);

    return sermon;
  }

  async update(id: string, data) {
    const sermon = await this.findById(id);

    return await sermon!.update(data);
  }

  async delete(id: string) {
    const sermon = await this.findById(id);
    await sermon!.destroy();

    return;
  }
}
