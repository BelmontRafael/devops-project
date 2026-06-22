import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "src/models";
import { CreateComment } from "./types/comment.types";
import { FindCommentsQueryDto } from "./dto/find-comments-query.dto";

export class CommentsRepository {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment
  ) {}

  async create(data: CreateComment) {
    const createdComment = await this.commentModel.create(data);

    return createdComment;
  }

  async findAll(findCommentsQuery: FindCommentsQueryDto) {
    const { page, limit, postId, orderBy, orderDirection } = findCommentsQuery;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (postId) where.postId = postId;
    const { rows, count } = await this.commentModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      posts: rows,
    };
  }

  async findById(id: string) {
    const comment = await this.commentModel.findByPk(id);

    return comment;
  }

  async delete(id: string) {
    const comment = await this.findById(id);
    await comment!.destroy();

    return;
  }
}
