import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Query,
} from "@nestjs/common";
import { LocationsService } from "./locations.service";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { FindLocationsQueryDto } from "./dto/find-locations-query.dto";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@UseInterceptors(UserActivityInterceptor)
@Controller("locations")
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({ summary: "Cadastrar novos locais" })
  @Post()
  create(
    @Body() createLocationDto: CreateLocationDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.locationsService.create(createLocationDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar todos os locais" })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() findLocationsQuery: FindLocationsQueryDto) {
    return this.locationsService.findAll(findLocationsQuery);
  }

  @ApiOperation({ summary: "Listar detalhes de um local específico" })
  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  findOne(@Param("id") id: string) {
    return this.locationsService.findOne(id);
  }

  @ApiOperation({ summary: "Atualizar um local específico" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateLocationDto: UpdateLocationDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.locationsService.update(id, updateLocationDto, tokenPayload);
  }

  @ApiOperation({ summary: "Excluir um local específico" })
  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.locationsService.remove(id, tokenPayload);
  }
}
