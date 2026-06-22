import {
  Column,
  Table,
  DataType,
  PrimaryKey,
  ForeignKey,
  Default,
  CreatedAt,
  UpdatedAt,
  Model,
} from "sequelize-typescript";
import { Sermon } from "src/models";

@Table({ tableName: "lessons", schema: "casa-church", timestamps: true })
export class Lesson extends Model<Lesson> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Sermon)
  @Column({ type: DataType.UUID })
  declare sermonId: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare description: string;

  @Column({ type: DataType.TEXT })
  declare videoLink: string;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  declare ordem: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
