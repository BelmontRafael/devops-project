import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateLessonDto {
  @ApiProperty({
    example: "Uma Vida com Deus",
    description: "Titulo da aula (máx. 100 caracteres)",
  })
  @IsNotEmpty({ message: "O título não pode estar vazio" })
  @IsString({ message: "O título não está no formato adequado" })
  declare title: string;

  @ApiProperty({
    example:
      "Esta aula fala sobre a importância de manter uma vida guiada pela fé e comunhão com Deus.",
    description: "Descrição da aula (máx. 255 caracteres)",
  })
  @IsString({ message: "A descrição não está no formato adequado" })
  declare description: string;

  @ApiProperty({
    example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
    description: "ID do sermão que a aula faz parte.",
  })
  @IsNotEmpty({ message: "O sermão não pode estar vazio" })
  @IsString({ message: "O sermão não está no formato adequado" })
  declare sermonId: string;

  @ApiProperty({
    example: "https://www.youtube.com/watch?v=SB5fhTaoGYU",
    description: "Link do vídeo associado a aula, usado para reprodução online",
  })
  @IsOptional()
  @IsString({ message: "O link do video não está no formato adequado" })
  declare videoLink: string;

  @ApiProperty({
    example: 1,
    description: "Número que define a ordem de exibição das aulas.",
  })
  @IsNumber({}, { message: "A ordem não está no formato adequado" })
  declare ordem: number;
}
