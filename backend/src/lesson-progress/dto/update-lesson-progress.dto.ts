import { IsNotEmpty, IsEnum } from "class-validator";
import { LessonProgressStatus } from "../types/lesson-progress.types";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLessonProgressDto {
  @ApiProperty({
    example: "in_progress",
    enum: ["in_progress", "completed"],
    description: "Estado da aula",
  })
  @IsNotEmpty({ message: "O status não pode estar vazio" })
  @IsEnum(LessonProgressStatus, {
    message: "O status deve ser um valor válido no sistema",
  })
  declare status: LessonProgressStatus;
}
