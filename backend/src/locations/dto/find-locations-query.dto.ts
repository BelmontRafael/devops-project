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
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindLocationsQueryDto extends FindQueryDto {
  @ApiPropertyOptional({
    example: "Salão Principal",
    description: "Filtra locais pelo nome",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro nome deve ser um texto" })
  name?: string;

  @ApiPropertyOptional({
    example: "Rua das Flores",
    description: "Filtra locais pela rua",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro rua deve ser um texto" })
  street?: string;

  @ApiPropertyOptional({
    example: "Rio de Janeiro",
    description: "Filtra locais pela cidade",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro cidade deve ser um texto" })
  city?: string;

  @ApiPropertyOptional({
    example: "Rio de Janeiro",
    description: "Filtra locais pelo estado",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro estado deve ser um texto" })
  state?: string;

  @ApiPropertyOptional({
    example: "RJ",
    description: "Filtra locais pela UF",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro UF deve ser um texto" })
  uf?: string;
}
