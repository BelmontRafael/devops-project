import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRegistrationDto {
  @ApiProperty({
    example: "dc30bf20-1094-4ee7-b515-9e7d3b2355a4",
    description: "ID do usuário que está sendo registrado no evento",
  })
  @IsNotEmpty({ message: "O campo usuário não pode ser vazio" })
  @IsString({ message: "O campo usuário não está no formato adequado" })
  userId: string;

  @ApiProperty({
    example: "66d23d75-a009-46ed-b4f9-d28ab47625bc",
    description: "ID do evento no qual o usuário será registrado",
  })
  @IsNotEmpty({ message: "O campo evento não pode ser vazio" })
  @IsString({ message: "O campo evento não está no formato adequado" })
  eventId: string;
}
