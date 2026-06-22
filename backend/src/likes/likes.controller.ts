import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLikesQueryDto } from "src/likes/dto/find-likes-query.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: "Criar nova curtida" })
  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.likesService.create(createLikeDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar todas curtida" })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() findLikesQuery: FindLikesQueryDto) {
    return this.likesService.findAll(findLikesQuery);
  }

  @ApiOperation({ summary: "Visualizar detalhes de uma curtida" })
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(id);
  }

  @ApiOperation({ summary: "Deletar uma curtida" })
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.likesService.remove(id, tokenPayload);
  }
}
