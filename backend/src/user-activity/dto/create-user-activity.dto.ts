import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, IsOptional, MaxLength } from "class-validator";

export class CreateUserActivityDto {
  @ApiProperty({
    example: "e4f9a2d1-5d11-4b1b-b0c7-9f45a1a7b7c1",
    description: "ID do usuário que realizou a ação",
  })
  @IsUUID("4", { message: "O campo userId deve ser um UUID válido." })
  userId: string;

  @ApiProperty({
    example: "POST",
    description: "Tipo de ação realizada (ex: POST, PUT, DELETE)",
  })
  @IsString({ message: "O campo action deve ser um texto válido." })
  action: string;

  @ApiProperty({
    example: "/events",
    description: "Endpoint ou rota onde a ação foi realizada",
  })
  @IsString({ message: "O campo endpoint deve ser um texto válido." })
  @MaxLength(200, { message: "O campo endpoint deve ter até 200 caracteres." })
  endpoint: string;

  @ApiProperty({
    example: "Usuário criou um novo evento",
    description: "Descrição da ação realizada",
  })
  @IsOptional()
  @IsString({ message: "O campo description deve ser um texto válido." })
  description?: string;
}
