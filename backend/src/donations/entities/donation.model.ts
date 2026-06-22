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
import { User } from "src/models";
import { PaymentMethods, Status } from "../types/donation.types";

@Table({ tableName: "donations",schema: "casa-church", timestamps: true })
export class Donation extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    declare userId: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare amount: number;

    @Column({ type: DataType.ENUM(...Object.values(PaymentMethods)), allowNull: false })
    declare paymentMethod: PaymentMethods;

    @Column({ type: DataType.ENUM(...Object.values(Status)), allowNull: false })
    declare status: Status;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;
}
