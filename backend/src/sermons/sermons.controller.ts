import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from "@nestjs/common";
import { SermonsService } from "./sermons.service";
import { CreateSermonDto } from "./dto/create-sermon.dto";
import { UpdateSermonDto } from "./dto/update-sermon.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { UseGuards } from "@nestjs/common";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { FindSermonQueryDto } from "./dto/find-sermon-query.dto";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller("sermons")
export class SermonsController {
  constructor(private readonly sermonsService: SermonsService) {}

  @ApiOperation({ summary: "Criar novos sermões" })
  @Post()
  create(
    @Body() createSermonDto: CreateSermonDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.sermonsService.create(createSermonDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar todos os sermões" })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() findSermonQueryDto: FindSermonQueryDto) {
    return this.sermonsService.findAll(findSermonQueryDto);
  }

  @ApiOperation({ summary: "Listar detalhes de um sermão específico" })
  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  findOne(@Param("id") id: string) {
    return this.sermonsService.findOne(id);
  }

  @ApiOperation({ summary: "Atualizar um sermão específico" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSermonDto: UpdateSermonDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.sermonsService.update(id, updateSermonDto, tokenPayload);
  }

  @ApiOperation({ summary: "Excluir um sermão específico" })
  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.sermonsService.remove(id, tokenPayload);
  }
}
