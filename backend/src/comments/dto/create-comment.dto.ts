import { IsNotEmpty, IsUUID, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({
    example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
    description: "ID do post referente ao comentário",
  })
  @IsNotEmpty({ message: "O post referente ao comentário não pode ser vazio" })
  @IsUUID()
  postId: string;

  @ApiProperty({
    example: "Hoje tivemos um encontro!",
    description: "Conteúdo do comentário (máximo 625 caracteres)",
    maxLength: 625,
  })
  @IsNotEmpty({ message: "O conteúdo do comentário não pode ser vazio" })
  @IsString({ message: "O conteúdo do comentário deve ser um texto" })
  @MaxLength(625, {
    message:
      "O conteúdo do comentário possui o tamanho máximo de 625 caracteres",
  })
  content: string;
}
