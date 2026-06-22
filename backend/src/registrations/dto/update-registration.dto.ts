import { IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RegistrationStatus } from "../types/registration.types";

export class UpdateRegistrationDto {
  @ApiProperty({
    example: RegistrationStatus.CONFIRMED,
    description: "Novo status da inscrição",
    enum: RegistrationStatus,
  })
  @IsNotEmpty({ message: "O status da inscrição não pode ser vazio" })
  @IsEnum(RegistrationStatus, {
    message: "O status deve ser um valor válido no sistema",
  })
  status: RegistrationStatus;
}
