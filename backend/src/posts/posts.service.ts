import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { PostsRepository } from "./posts.repository";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import {
  CREATED_POST_MESSAGE,
  DELETED_POST_MESSAGE,
  NOT_FOUND_POST_MESSAGE,
} from "./posts.constants";

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto, tokenPayload: TokenPayloadDto) {
    if (createPostDto.userId !== tokenPayload.id)
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    const createdPost = await this.postsRepository.create(createPostDto);
    return {
      message: CREATED_POST_MESSAGE,
      post: createdPost,
    };
  }

  async findAll(findPostsQuery: FindPostsQueryDto) {
    const posts = await this.postsRepository.findAll(findPostsQuery);

    return posts;
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findById(id);
    if (!post) throw new NotFoundException(NOT_FOUND_POST_MESSAGE);

    return post;
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const post = await this.postsRepository.findById(id);
    if (!post) throw new NotFoundException(NOT_FOUND_POST_MESSAGE);

    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      post.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    await this.postsRepository.delete(id);
    return {
      message: DELETED_POST_MESSAGE,
    };
  }
}
