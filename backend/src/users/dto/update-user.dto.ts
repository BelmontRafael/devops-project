import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsEnum,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { UserRoles } from "../types/user.types";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: "Anderson Souza",
    description: "Nome completo do usuário (máx. 150 caracteres)",
  })
  @IsOptional()
  @IsString({ message: "O campo nome deve ser um texto." })
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({
    example: "anderson.souza@email.com",
    description: "Endereço de e-mail válido do usuário (máx. 100 caracteres)",
  })
  @IsOptional()
  @IsEmail({}, { message: "O campo email deve ser um email válido." })
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({
    example: "senhaSegura123",
    description: "Senha de acesso do usuário (mín. 6 caracteres)",
  })
  @IsOptional()
  @IsString({ message: "O campo senha deve ser um texto." })
  @MaxLength(255)
  @MinLength(6, { message: "A senha deve conter no mínimo 6 caracteres" })
  password?: string;

  @ApiPropertyOptional({
    example: "user",
    description: "Cargo do usuário dentro do sistema",
    enum: UserRoles,
  })
  @IsOptional()
  @IsEnum(UserRoles, { message: "O campo cargo deve ser 'user' ou 'admin'." })
  role?: UserRoles;

  @ApiPropertyOptional({
    example: true,
    description: "Define se o usuário está ativo ou inativo",
  })
  @IsOptional()
  @IsBoolean({ message: "O campo ativo deve ser um booleano." })
  active?: boolean;
}
