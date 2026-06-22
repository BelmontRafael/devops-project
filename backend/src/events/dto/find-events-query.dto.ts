import { IsOptional, IsString, IsUUID, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindEventsQueryDto extends FindQueryDto {
  @ApiPropertyOptional({
    example: "Encontro da Casa Church",
    description: "Filtra eventos pelo título",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro título deve ser um texto" })
  title?: string;

  @ApiPropertyOptional({
    example: "2025-11-20T18:00:00.000Z",
    description: "Filtra eventos pela data de início",
    type: String,
    format: "date-time",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "O parâmetro data de início deve ser uma data válida" })
  startDate?: Date;

  @ApiPropertyOptional({
    example: "2025-11-20T20:00:00.000Z",
    description: "Filtra eventos pela data de término",
    type: String,
    format: "date-time",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "O parâmetro data de término deve ser uma data válida" })
  endDate?: Date;

  @ApiPropertyOptional({
    example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
    description: "Filtra eventos pelo ID do usuário que criou",
  })
  @IsOptional()
  @IsUUID(4, { message: "O parâmetro autor deve ser um tipo válido" })
  createdBy?: string;
}
