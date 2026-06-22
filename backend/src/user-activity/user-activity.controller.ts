import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { UserActivityService } from "./user-activity.service";
import { CreateUserActivityDto } from "./dto/create-user-activity.dto";
import { FindUserActivityQueryDto } from "./dto/find-user-activity-query.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { UseGuards } from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller("user-activity")
export class UserActivityController {
  constructor(private readonly userActivityService: UserActivityService) {}

  @ApiOperation({ summary: "Registrar uma nova atividade de usuário" })
  @Post()
  create(@Body() createDto: CreateUserActivityDto) {
    return this.userActivityService.create(createDto);
  }

  @ApiOperation({ summary: "Listar todas as atividades registradas" })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() query: FindUserActivityQueryDto) {
    return this.userActivityService.findAll(query);
  }

  @ApiOperation({ summary: "Listar detalhes de uma atividade específica" })
  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  findOne(@Param("id") id: string) {
    return this.userActivityService.findOne(id);
  }

  @ApiOperation({ summary: "Excluir um registro de atividade" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userActivityService.remove(id);
  }
}
