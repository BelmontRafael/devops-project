import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CREATE_LIKE_CONFLICT_MESSAGE,
  CREATED_LIKE,
  DELETED_LIKE,
  NOT_FOUND_LIKE,
} from "./likes.constants";

import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { CreateLikeDto } from "./dto/create-like.dto";
import { LikesRepository } from "./likes.repository";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLikesQueryDto } from "./dto/find-likes-query.dto";
import { PostsRepository } from "src/posts/posts.repository";
import { NOT_FOUND_POST_MESSAGE } from "src/posts/posts.constants";

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly postsRepository: PostsRepository
  ) {}

  async create(createLikeDto: CreateLikeDto, tokenPayload: TokenPayloadDto) {
    const postExists = await this.postsRepository.findById(
      createLikeDto.postId
    );
    if (!postExists) throw new NotFoundException(NOT_FOUND_POST_MESSAGE);

    const existing = await this.likesRepository.findByUserAndPost(
      tokenPayload.id,
      createLikeDto.postId
    );
    if (existing) throw new ConflictException(CREATE_LIKE_CONFLICT_MESSAGE);

    const likeData = {
      userId: tokenPayload.id,
      ...createLikeDto,
    };

    const like = await this.likesRepository.create(likeData);
    return {
      message: CREATED_LIKE,
      like,
    };
  }

  async findAll(findLikesQuery: FindLikesQueryDto) {
    return await this.likesRepository.findAll(findLikesQuery);
  }

  async findOne(id: string) {
    const like = await this.likesRepository.findById(id);
    if (!like) throw new NotFoundException(NOT_FOUND_LIKE);

    return like;
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const like = await this.likesRepository.findById(id);
    if (!like) throw new NotFoundException(NOT_FOUND_LIKE);

    if (like.userId !== tokenPayload.id)
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    await this.likesRepository.delete(id);
    return {
      message: DELETED_LIKE,
    };
  }
}
