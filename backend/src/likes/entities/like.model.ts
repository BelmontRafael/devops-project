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
import { User, Post } from "src/models";

@Table({ tableName: "likes", schema: "casa-church", timestamps: true, updatedAt: false, })
export class Like extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Post)
    @Column({ type: DataType.UUID })
    declare postId: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    declare userId: string;

    @CreatedAt
    declare createdAt: Date;
}
