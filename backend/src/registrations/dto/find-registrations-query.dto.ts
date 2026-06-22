import { IsOptional, IsString, IsUUID } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindRegistrationsQueryDto extends FindQueryDto {
  @ApiPropertyOptional({
    example: "dc30bf20-1094-4ee7-b515-9e7d3b2355a4",
    description: "Filtra inscrições pelo ID do usuário (UUID v4)",
  })
  @IsOptional()
  @IsUUID(4, { message: "O parâmetro usuário deve ser um tipo válido" })
  userId?: string;

  @ApiPropertyOptional({
    example: "66d23d75-a009-46ed-b4f9-d28ab47625bc",
    description: "Filtra inscrições pelo ID do evento (UUID v4)",
  })
  @IsOptional()
  @IsUUID(4, { message: "O parâmetro evento deve ser um tipo válido" })
  eventId?: string;

  @ApiPropertyOptional({
    example: "pending",
    description:
      "Filtra inscrições pelo status (ex: confirmed, pending, canceled)",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro status deve ser um texto" })
  status?: string;
}
