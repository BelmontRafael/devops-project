import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Query,
} from "@nestjs/common";
import { EventFeedbacksService } from "./event-feedbacks.service";
import { CreateEventFeedbackDto } from "./dto/create-event-feedback.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { FindEventFeedbacksQueryDto } from "./dto/find-event-feedbacks-query.dto";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller("event-feedbacks")
export class EventFeedbacksController {
  constructor(private readonly eventFeedbacksService: EventFeedbacksService) {}

  @ApiOperation({ summary: "Criar um novo feedback para um evento" })
  @Post()
  create(
    @Body() createEventFeedbackDto: CreateEventFeedbackDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.eventFeedbacksService.create(
      createEventFeedbackDto,
      tokenPayload
    );
  }

  @ApiOperation({ summary: "Listar todos os feedbacks de eventos" })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() findEventFeedbacksQuery: FindEventFeedbacksQueryDto) {
    return this.eventFeedbacksService.findAll(findEventFeedbacksQuery);
  }

  @ApiOperation({ summary: "Listar detalhes de um feedbacks específico" })
  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  findOne(@Param("id") id: string) {
    return this.eventFeedbacksService.findOne(id);
  }

  @ApiOperation({ summary: "Excluir um feedback específico" })
  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.eventFeedbacksService.remove(id, tokenPayload);
  }
}
