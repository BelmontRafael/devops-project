import { IsOptional, IsUUID } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindDonationsQueryDto extends FindQueryDto {
  @ApiPropertyOptional({
    example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
    description: "Filtra pelo ID do usuário (UUID v4)",
  })
  @IsOptional()
  @IsUUID(4, { message: "O parâmetro usuário deve ser um tipo válido" })
  userId?: string;
}
