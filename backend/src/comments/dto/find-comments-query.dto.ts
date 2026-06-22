import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindCommentsQueryDto {
  @ApiPropertyOptional({
    example: 1,
    description: "Número da página para paginação (valor padrão: 1)",
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro página deve ser um inteiro" })
  @Min(1, { message: "O parâmetro página deve ser no mínimo 1" })
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: "Quantidade máxima de registros por página (valor padrão: 10)",
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro limite deve ser um inteiro" })
  @Min(1, { message: "O parâmetro limite deve ser no mínimo 1" })
  limit: number = 10;

  @ApiPropertyOptional({
    example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
    description: "Filtra pelo ID da postagem (UUID v4)",
  })
  @IsOptional()
  @IsUUID(4, { message: "O parâmetro postagem deve ser um tipo válido" })
  postId?: string;

  @ApiPropertyOptional({
    example: "createdAt",
    description:
      "Campo usado para ordenar os resultados (valor padrão: createdAt)",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro ordenar deve ser um texto" })
  orderBy: string = "createdAt";

  @ApiPropertyOptional({
    example: "DESC",
    description: "Direção da ordenação: ASC ou DESC (valor padrão: DESC)",
    enum: ["ASC", "DESC"],
  })
  @IsOptional()
  @IsIn(["ASC", "DESC"], {
    message: "O parâmetro direção deve ser ASC ou DESC",
  })
  orderDirection: "ASC" | "DESC" = "DESC";
}
