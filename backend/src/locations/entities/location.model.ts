import {
  CreatedAt,
  DataType,
  Default,
  PrimaryKey,
  UpdatedAt,
} from "sequelize-typescript";
import { Table, Column, Model } from "sequelize-typescript";

@Table({ tableName: "locations", schema: "casa-church", timestamps: true })
export class Location extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(200), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare street: string;

  @Column({ type: DataType.STRING(10), allowNull: false })
  declare number: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare neighborhood: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare city: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare state: string;

  @Column({ type: DataType.STRING(2), allowNull: false })
  declare uf: string;

  @Column({ type: DataType.INTEGER })
  declare capacity: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
