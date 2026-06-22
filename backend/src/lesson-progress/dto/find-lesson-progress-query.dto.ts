import { IsOptional, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { UUIDV4 } from "sequelize";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindLessonProgressDto extends FindQueryDto {
  @ApiPropertyOptional({
    example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
    description: "ID da aula no formato UUID v4",
  })
  @IsOptional()
  @Type(() => UUIDV4)
  @IsUUID(4, { message: "O parâmetro aula deve ser uma string" })
  lessonId: string;
}
