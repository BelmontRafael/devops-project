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
import { LessonProgressService } from "./lesson-progress.service";
import { CreateLessonProgressDto } from "./dto/create-lesson-progress.dto";
import { UpdateLessonProgressDto } from "./dto/update-lesson-progress.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { FindLessonProgressDto } from "./dto/find-lesson-progress-query.dto";
import { ApiOperation } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller("lesson-progress")
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  @ApiOperation({ summary: "Criar novos progressos de aula." })
  @Post()
  create(
    @Body() createLessonProgressDto: CreateLessonProgressDto,
    @TokenPayloadParam() tokenPayLoad: TokenPayloadDto
  ) {
    return this.lessonProgressService.create(
      createLessonProgressDto,
      tokenPayLoad
    );
  }

  @ApiOperation({ summary: "Listar os progressos de aula." })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(
    @TokenPayloadParam() tokenPayLoad: TokenPayloadDto,
    @Query() findLessonProgressDto: FindLessonProgressDto
  ) {
    return this.lessonProgressService.findAll(
      tokenPayLoad,
      findLessonProgressDto
    );
  }

  @ApiOperation({ summary: "Atualizar os progressos de aula." })
  @Patch(":lessonId")
  update(
    @Param("lessonId") lessonId: string,
    @Body() updateLessonProgressDto: UpdateLessonProgressDto,
    @TokenPayloadParam() tokenPayLoad: TokenPayloadDto
  ) {
    console.log(lessonId);
    return this.lessonProgressService.update(
      lessonId,
      updateLessonProgressDto,
      tokenPayLoad
    );
  }

  @ApiOperation({ summary: "Remover os progressos de aula." })
  @Delete(":lessonId")
  remove(
    @Param("lessonId") lessonId: string,
    @TokenPayloadParam() tokenPayLoad: TokenPayloadDto
  ) {
    return this.lessonProgressService.remove(lessonId, tokenPayLoad);
  }
}
