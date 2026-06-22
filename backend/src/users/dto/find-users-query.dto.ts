import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindUsersQueryDto extends FindQueryDto {
  @ApiPropertyOptional({
    example: "Lucas",
    description: "Filtro pelo nome do usuário",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro nome deve ser um texto" })
  name?: string;
}
