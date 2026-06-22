import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";

import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: "Criar novas postagens" })
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.postsService.create(createPostDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar todas as postagens" })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() findPostsQuery: FindPostsQueryDto) {
    return this.postsService.findAll(findPostsQuery);
  }

  @ApiOperation({ summary: "Listar detalhes de uma postagem específica" })
  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: "Excluír uma postagem específica" })
  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.postsService.remove(id, tokenPayload);
  }
}
