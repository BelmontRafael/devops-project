import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLikeDto {
  @ApiProperty({
    example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
    description: "ID do post referente à curtida",
  })
  @IsNotEmpty({ message: "O post referente à curtida não pode ser vazio" })
  @IsUUID()
  postId: string;
}
