import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindLessonQueryDto extends FindQueryDto {
  @ApiProperty({
    example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
    description: "ID do sermão no formato UUID v4",
  })
  @IsUUID("4", { message: "O parâmetro sermão é inválido." })
  sermonId: string;
}
