import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
  IsEmail,
  IsEnum,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRoles } from "../types/user.types";

export class CreateUserDto {
  @ApiProperty({
    example: "Anderson Souza",
    description: "Nome completo do usuário (máx. 150 caracteres)",
  })
  @IsNotEmpty({ message: "O campo nome não pode ser vazio." })
  @IsString({ message: "O campo nome deve ser um texto." })
  @MaxLength(150)
  name: string;

  @ApiProperty({
    example: "anderson.souza@email.com",
    description: "Endereço de e-mail válido do usuário (máx. 100 caracteres)",
  })
  @IsNotEmpty({ message: "O campo email não pode ser vazio." })
  @IsEmail({}, { message: "O campo email deve ser um email válido." })
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: "senhaSegura123",
    description: "Senha de acesso do usuário (mín. 6 caracteres)",
  })
  @IsNotEmpty({ message: "O campo senha não pode ser vazio." })
  @IsString({ message: "O campo senha deve ser um texto." })
  @MaxLength(255)
  @MinLength(6, { message: "A senha deve conter no mínimo 6 caracteres" })
  password: string;

  @ApiProperty({
    example: "user",
    description: "Cargo do usuário dentro do sistema",
    enum: UserRoles,
  })
  @IsNotEmpty({ message: "O campo cargo não pode ser vazio." })
  @IsEnum(UserRoles, { message: "O campo cargo deve ser 'user' ou 'admin'." })
  role: UserRoles;

  // @ApiPropertyOptional({
  //   example: true,
  //   description: "Define se o usuário está ativo ou inativo (padrão: true)",
  // })
  // @IsOptional()
  // @IsBoolean({ message: "O campo ativo deve ser um booleano." })
  // active?: boolean;
}
