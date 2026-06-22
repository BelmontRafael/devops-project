import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
} from "sequelize-typescript";
import { User } from "src/models";

@Table({
  tableName: "user_activity_logs",
  schema: "casa-church",
  timestamps: true,
})
export class UserActivity extends Model<UserActivity> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare action: string;

  @Column({ type: DataType.STRING(200) })
  declare endpoint: string;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @CreatedAt
  declare createdAt: Date;
}
