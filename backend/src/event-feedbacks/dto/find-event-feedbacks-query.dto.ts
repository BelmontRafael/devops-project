import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  IsUUID,
  Max,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindEventFeedbacksQueryDto extends FindQueryDto {
  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Filtra as avaliações pelo ID do evento",
  })
  @IsOptional()
  @IsUUID("4", { message: "O parâmetro evento deve ser um valor válido" })
  eventId?: string;

  @ApiPropertyOptional({
    example: 5,
    description: "Filtra as avaliações pela nota (1 a 5)",
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro nota deve ser um inteiro" })
  @Min(1, { message: "O parâmetro nota deve ser no mínimo 1" })
  @Max(5, { message: "O parâmetro nota deve ser no máximo 5" })
  rating?: number;
}
