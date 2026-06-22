import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsUUID,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEventFeedbackDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "ID do evento para o qual a avaliação está sendo dada",
  })
  @IsNotEmpty({ message: "O campo ID do evento não pode ser vazio." })
  @IsUUID("4", { message: "O campo ID do evento deve ser um UUID válido." })
  eventId: string;

  @ApiProperty({
    example: 5,
    description: "Avaliação do evento (de 1 a 5)",
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty({ message: "O campo avaliação não pode ser vazio." })
  @IsInt({ message: "A avaliação deve ser um número inteiro." })
  @Min(1, { message: "A avaliação mínima é 1." })
  @Max(5, { message: "A avaliação máxima é 5." })
  rating: number;

  @ApiPropertyOptional({
    example: "Evento maravilhoso! Organização impecável e conteúdo inspirador.",
    description: "Comentário opcional sobre o evento (máx. 250 caracteres)",
    maxLength: 250,
  })
  @IsOptional()
  @IsString({ message: "O campo comentário deve ser um texto." })
  @MaxLength(250, {
    message: "O comentário deve ter no máximo 250 caracteres.",
  })
  comment?: string;
}
