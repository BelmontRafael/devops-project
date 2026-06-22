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
import { RegistrationsService } from "./registrations.service";
import { CreateRegistrationDto } from "./dto/create-registration.dto";
import { UpdateRegistrationDto } from "./dto/update-registration.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { UseGuards } from "@nestjs/common";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindRegistrationsQueryDto } from "./dto/find-registrations-query.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller("registrations")
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @ApiOperation({ summary: "Criar novas inscrições" })
  @Post()
  create(
    @Body() createRegistrationDto: CreateRegistrationDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.registrationsService.create(
      createRegistrationDto,
      tokenPayload
    );
  }

  @ApiOperation({
    summary:
      "Listar todas as inscrições (obs: admins podem listar de todos os usuários)",
  })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
    @Query() findRegistrationsQuery: FindRegistrationsQueryDto
  ) {
    return this.registrationsService.findAll(
      tokenPayload,
      findRegistrationsQuery
    );
  }

  @ApiOperation({
    summary: "Listar detalhes de uma inscrição específica",
  })
  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  findOne(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.registrationsService.findOne(id, tokenPayload);
  }

  @ApiOperation({ summary: "Atualizar uma inscrição (ex: status) específica" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.registrationsService.update(
      id,
      updateRegistrationDto,
      tokenPayload
    );
  }

  @ApiOperation({ summary: "Excluír(cancelar) uma inscrição específica" })
  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.registrationsService.remove(id, tokenPayload);
  }
}
