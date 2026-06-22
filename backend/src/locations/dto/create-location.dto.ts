import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
  @ApiProperty({
    example: "Salão Principal",
    description: "Nome do local (máx. 200 caracteres)",
    maxLength: 200,
  })
  @IsNotEmpty({ message: "O campo nome do local não pode ser vazio." })
  @IsString({ message: "O campo nome do local não é válido." })
  @MaxLength(200, {
    message: "O nome do local deve ter no máximo 200 caracteres.",
  })
  name: string;

  @ApiProperty({
    example: "Rua das Flores",
    description: "Rua do local (máx. 100 caracteres)",
    maxLength: 100,
  })
  @IsNotEmpty({ message: "O campo rua não pode ser vazio." })
  @IsString({ message: "O campo rua não é válido." })
  @MaxLength(100, { message: "A rua deve ter no máximo 100 caracteres." })
  street: string;

  @ApiProperty({
    example: "123",
    description: "Número do local (máx. 10 caracteres)",
    maxLength: 10,
  })
  @IsNotEmpty({ message: "O campo número não pode ser vazio." })
  @IsString({ message: "O campo número não é válido." })
  @MaxLength(10, { message: "O número deve ter no máximo 10 caracteres." })
  number: string;

  @ApiProperty({
    example: "Centro",
    description: "Bairro do local (máx. 50 caracteres)",
    maxLength: 50,
  })
  @IsNotEmpty({ message: "O campo bairro não pode ser vazio." })
  @IsString({ message: "O campo bairro não é válido." })
  @MaxLength(50, { message: "O bairro deve ter no máximo 50 caracteres." })
  neighborhood: string;

  @ApiProperty({
    example: "Rio de Janeiro",
    description: "Cidade do local (máx. 50 caracteres)",
    maxLength: 50,
  })
  @IsNotEmpty({ message: "O campo cidade não pode ser vazio." })
  @IsString({ message: "O campo cidade não é válido." })
  @MaxLength(50, { message: "A cidade deve ter no máximo 50 caracteres." })
  city: string;

  @ApiProperty({
    example: "Rio de Janeiro",
    description: "Estado do local (máx. 50 caracteres)",
    maxLength: 50,
  })
  @IsNotEmpty({ message: "O campo estado não pode ser vazio." })
  @IsString({ message: "O campo estado não é válido." })
  @MaxLength(50, { message: "O estado deve ter no máximo 50 caracteres." })
  state: string;

  @ApiProperty({
    example: "RJ",
    description: "UF do local (2 caracteres)",
    maxLength: 2,
  })
  @IsNotEmpty({ message: "O campo UF não pode ser vazio." })
  @IsString({ message: "O campo UF não é válido." })
  @MaxLength(2, { message: "A UF deve ter no máximo 2 caracteres." })
  uf: string;

  @ApiProperty({
    example: 100,
    description: "Capacidade máxima do local",
    required: false,
  })
  @IsOptional()
  @IsInt({ message: "A capacidade deve ser um número inteiro." })
  @Min(1, { message: "A capacidade mínima é 1." })
  capacity?: number;
}
