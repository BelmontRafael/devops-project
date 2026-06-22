import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models";
import { CreateUser } from "./types/user.types";
import { UpdateUser } from "./types/user.types";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
import { Op } from "sequelize";

export class UsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async create(data: CreateUser) {
    const createdUser = await this.userModel.create(data);

    return createdUser;
  }

  async findAll(findUsersQuery: FindUsersQueryDto) {
    const { page, limit, name, orderBy, orderDirection } = findUsersQuery;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (name) where.name = { [Op.iLike]: `${name}%` };

    const { rows, count } = await this.userModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
      attributes: { exclude: ["password"] },
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      users: rows,
    };
  }

  async findById(id: string) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async update(id: string, data: UpdateUser) {
    const user = await this.findById(id);

    return await user!.update(data);
  }

  async delete(id: string) {
    const user = await this.findById(id);
    await user!.destroy();

    return;
  }
}
