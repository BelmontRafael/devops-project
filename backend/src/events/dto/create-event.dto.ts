import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsDate,
  MaxLength,
  IsUUID,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  @ApiProperty({
    example: "Encontro da Casa Church",
    description: "Título do evento (máx. 255 caracteres)",
    maxLength: 255,
  })
  @IsNotEmpty({ message: "O campo título do evento não pode ser vazio." })
  @IsString({ message: "O campo título do evento não é um válido" })
  @MaxLength(255, {
    message: "O título do evento deve ter o tamanho máximo de 255 caracteres",
  })
  title: string;

  @ApiProperty({
    example: "Um encontro especial para todos os membros da comunidade",
    description: "Descrição do evento (máx. 500 caracteres)",
    maxLength: 500,
  })
  @IsNotEmpty({ message: "O campo descrição do evento não pode ser vazio." })
  @IsString({ message: "O campo descrição do evento não é um válido" })
  @MaxLength(500, {
    message:
      "A descrição do evento deve ter o tamanho máximo de 500 caracteres",
  })
  description: string;

  @ApiProperty({
    example: "2025-11-20T18:00:00.000Z",
    description: "Data de início do evento",
    type: String,
    format: "date-time",
  })
  @IsNotEmpty({ message: "O campo data de início não pode ser vazio." })
  @IsDate({ message: 'O campo data de início deve ser do tipo "data"' })
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    example: "2025-11-20T20:00:00.000Z",
    description: "Data de término do evento",
    type: String,
    format: "date-time",
  })
  @IsNotEmpty({ message: "O campo data de término não pode ser vazio." })
  @IsDate({ message: 'O campo data de término deve ser do tipo "data"' })
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    example: "d0f4e6d1-4a23-4c7a-9c9b-8b01f4c0e5e9",
    description: "ID do local onde o evento será realizado",
  })
  @IsNotEmpty({ message: "O campo local do evento não pode ser vazio." })
  @IsUUID("4", { message: "O campo local do evento deve ser um UUID válido." })
  locationId: string;
}
