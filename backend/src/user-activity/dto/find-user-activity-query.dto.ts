import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsUUID, IsString, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class FindUserActivityQueryDto {
  @ApiPropertyOptional({
    description: "Número da página para paginação",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro página deve ser um número inteiro." })
  @Min(1, { message: "O número da página deve ser no mínimo 1." })
  page: number = 1;

  @ApiPropertyOptional({
    description: "Quantidade de registros por página",
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro limite deve ser um número inteiro." })
  @Min(1, { message: "O limite deve ser no mínimo 1." })
  limit: number = 10;

  @ApiPropertyOptional({
    description: "Filtra logs por ID de usuário",
    example: "e4f9a2d1-5d11-4b1b-b0c7-9f45a1a7b7c1",
  })
  @IsOptional()
  @IsUUID("4", { message: "O campo userId deve ser um UUID válido." })
  userId?: string;

  @ApiPropertyOptional({
    description: "Filtra logs por tipo de ação (ex: POST, DELETE)",
    example: "DELETE",
  })
  @IsOptional()
  @IsString({ message: "O campo action deve ser um texto válido." })
  action?: string;
}
