import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSermonDto {
  @ApiProperty({
    example: "Uma Vida com Deus",
    description: "Titulo do sermão (máx. 100 caracteres)",
  })
  @IsNotEmpty({ message: "O título não pode estar vazio" })
  @IsString({ message: "O título não está no formato adequado" })
  declare title: string;

  @ApiProperty({
    example:
      "Este sermão fala sobre a importância de manter uma vida guiada pela fé e comunhão com Deus.",
    description: "Descrição do sermão (máx. 255 caracteres)",
  })
  @IsString({ message: "A descrição não está no formato adequado" })
  declare description: string;

  @ApiProperty({
    example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
    description: "ID do usuário que criou o sermão",
  })
  @IsNotEmpty({ message: "O usuário não pode estar vazio" })
  @IsString({ message: "O usuário não está no formato adequado" })
  declare createdBy: string;
}
