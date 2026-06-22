import { IsNotEmpty, IsUUID, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
    description: "ID do usuário que está criando a postagem",
  })
  @IsNotEmpty({ message: "O usuário da postagem não pode ser vazio" })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: "Hoje tivemos um encontro incrível na comunidade!",
    description: "Conteúdo da postagem (máximo 625 caracteres)",
    maxLength: 625,
  })
  @IsNotEmpty({ message: "O conteúdo da postagem não pode ser vazio" })
  @IsString({ message: "O conteúdo da postagem deve ser um texto" })
  @MaxLength(625, {
    message: "O conteúdo da postagem possui o tamanho máximo de 625 caracteres",
  })
  content: string;
}
