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
import { User } from "src/models";

@Table({ tableName: "sermons", schema: "casa-church", timestamps: true })
export class Sermon extends Model<Sermon> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(100) })
  declare title: string;

  @Column({ type: DataType.STRING(255) })
  declare description: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare createdBy: string;
}
