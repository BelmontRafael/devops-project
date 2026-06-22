import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateLessonProgressDto {
  @ApiProperty({
    example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
    description: "ID do usuário no formato UUID v4.",
  })
  @IsNotEmpty({ message: "O usuario não pode estar vazio" })
  @IsString({ message: "O usuario não está no formato adequado" })
  declare userId: string;

  @ApiProperty({
    example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
    description: "ID da aula no formato UUID v4.",
  })
  @IsNotEmpty({ message: "A aula não pode estar vazia" })
  @IsString({ message: "A aula não está no formato adequado" })
  declare lessonId: string;
}
