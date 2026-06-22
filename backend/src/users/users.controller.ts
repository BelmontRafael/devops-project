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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { ApiSecurity, ApiOperation } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { UserActivityInterceptor } from "src/common/interceptors/user-activity.interceptor";

@UseInterceptors(UserActivityInterceptor)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Cadastrar novos usuários" })
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Listar todos os usuários" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() findUsersQuery: FindUsersQueryDto) {
    return this.usersService.findAll(findUsersQuery);
  }

  @ApiOperation({ summary: "Listar detalhes de um usuário específico" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: "Atualizar um usuário específico" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.usersService.update(id, updateUserDto, tokenPayload);
  }

  @ApiOperation({ summary: "Excluir um usuário específico" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.usersService.remove(id, tokenPayload);
  }
}
