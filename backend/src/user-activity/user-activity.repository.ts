import { InjectModel } from "@nestjs/sequelize";
import { UserActivity } from "src/user-activity/entities/user-activity.model";
import { FindUserActivityQueryDto } from "./dto/find-user-activity-query.dto";

export class UserActivityRepository {
  constructor(
    @InjectModel(UserActivity)
    private readonly userActivityModel: typeof UserActivity
  ) {}

  async create(data) {
    const created = await this.userActivityModel.create(data);
    return created;
  }

  async findAll(findQuery: FindUserActivityQueryDto) {
    const { page, limit, userId, action } = findQuery;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (userId) where.userId = userId;
    if (action) where.action = action;

    const { rows, count } = await this.userActivityModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      activities: rows,
    };
  }

  async findById(id: string) {
    const activity = await this.userActivityModel.findByPk(id);
    return activity;
  }

  async delete(id: string) {
    const activity = await this.findById(id);
    if (activity) await activity.destroy();
    return;
  }
}
