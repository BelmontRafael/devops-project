import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { UseGuards } from "@nestjs/common";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLessonQueryDto } from "./dto/find-lesson-query.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller("lessons")
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOperation({ summary: "Cadastrar novas aulas" })
  @Post()
  create(
    @Body() createLessonDto: CreateLessonDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.lessonsService.create(createLessonDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar todas as aulas" })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(
    @Query() findLessonQueryDto: FindLessonQueryDto
  ) {
    return this.lessonsService.findAll(findLessonQueryDto);
  }

  @ApiOperation({ summary: "Listar detalhes de uma aula específica" })
  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  findOne(@Param("id") id: string) {
    return this.lessonsService.findOne(id);
  }

  @ApiOperation({ summary: "Atualizar uma aula específica" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.lessonsService.update(id, updateLessonDto, tokenPayload);
  }

  @ApiOperation({ summary: "Excluir uma aula específica" })
  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.lessonsService.remove(id, tokenPayload);
  }
}
