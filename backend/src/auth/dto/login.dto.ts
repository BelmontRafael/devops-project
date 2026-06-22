import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "admin@casachurch.com",
    description: "Endereço de e-mail do usuário utilizado para login",
  })
  @IsNotEmpty({ message: "O email é um campo obrigatório" })
  @IsEmail({}, { message: "O email enviado é inválido" })
  email: string;

  @ApiProperty({
    example: "casachurch123",
    description: "Senha de acesso do usuário (mínimo de 6 caracteres)",
  })
  @IsNotEmpty({ message: "A senha é um campo obrigatório" })
  @IsString({ message: "A senha deve ser do tipo texto" })
  @MinLength(6, { message: "A senha deve conter pelo menos 6 caracteres" })
  password: string;
}
