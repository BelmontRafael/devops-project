import {
    CreatedAt,
    UpdatedAt,
    DataType,
    Default,
    PrimaryKey,
} from "sequelize-typescript";
import { Table, Column, Model } from "sequelize-typescript";

@Table({ tableName: "contact_messages", schema: "casa-church", timestamps: true })
export class ContactMessage extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare email: string;

    @Column({ type: DataType.STRING(150), allowNull: false })
    declare subject: string;

    @Column({ type: DataType.STRING(500), allowNull: false })
    declare message: string;
     
    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;
}
