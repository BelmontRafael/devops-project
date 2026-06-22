import{
    Model,
    Column,
    Table,
    CreatedAt,
    PrimaryKey,
    ForeignKey,
    DataType,
    Default,
    UpdatedAt,
} from "sequelize-typescript";
import { User, Post } from "src/models";

@Table({ tableName: "comments", schema: "casa-church", timestamps: true })
export class Comment extends Model{
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

    @Column({ type: DataType.STRING(625), allowNull: false })
    declare content: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;
}
