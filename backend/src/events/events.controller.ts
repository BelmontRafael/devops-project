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
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindEventsQueryDto } from "./dto/find-events-query.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: "Cadastrar novos eventos" })
  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.eventsService.create(createEventDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar todos os eventos" })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() findEventsQuery: FindEventsQueryDto) {
    return this.eventsService.findAll(findEventsQuery);
  }

  @ApiOperation({ summary: "Listar detalhes de um evento especifico" })
  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  findOne(@Param("id") id: string) {
    return this.eventsService.findOne(id);
  }

  @ApiOperation({ summary: "Atualizar um eventos especifico" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEventDto: UpdateEventDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.eventsService.update(id, updateEventDto, tokenPayload);
  }

  @ApiOperation({ summary: "Excluir um evento especifico" })
  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.eventsService.remove(id, tokenPayload);
  }
}
