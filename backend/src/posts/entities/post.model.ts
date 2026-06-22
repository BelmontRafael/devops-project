import {
  Model,
  Column,
  Table,
  CreatedAt,
  PrimaryKey,
  ForeignKey,
  DataType,
  Default,
} from "sequelize-typescript";
import { User } from "src/models";

@Table({
  tableName: "posts",
  schema: "casa-church",
  timestamps: true,
  updatedAt: false,
})
export class Post extends Model<Post> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @Column({ type: DataType.STRING(625) })
  declare content: string;

  @CreatedAt
  declare createdAt: Date;
}
