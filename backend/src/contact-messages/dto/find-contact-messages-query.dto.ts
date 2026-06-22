import { IsOptional, IsUUID } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindContactMessagesQueryDto extends FindQueryDto {
  @ApiPropertyOptional({
    example: "azynn@hotmail.com",
    description: "Filtra pelo e-mail do usuário",
  })
  @IsOptional()
  @IsUUID(4, { message: "O parâmetro e-mail deve ser um tipo válido" })
  email?: string;
}
