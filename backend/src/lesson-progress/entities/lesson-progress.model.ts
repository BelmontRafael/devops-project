import {
  Column,
  Table,
  DataType,
  PrimaryKey,
  ForeignKey,
  Default,
  CreatedAt,
  Model,
  UpdatedAt,
} from "sequelize-typescript";
import { Lesson, User } from "src/models";
import { LessonProgressStatus } from "../types/lesson-progress.types";

@Table({
  tableName: "lesson_progress",
  schema: "casa-church",
  timestamps: true,
})
export class LessonProgress extends Model<LessonProgress> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @ForeignKey(() => Lesson)
  @Column({ type: DataType.UUID })
  declare lessonId: string;

  @Default(LessonProgressStatus.IN_PROGRESS)
  @Column(DataType.ENUM(...Object.values(LessonProgressStatus)))
  declare status: LessonProgressStatus;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
