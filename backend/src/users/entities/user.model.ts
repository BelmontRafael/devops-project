import { Default } from "sequelize-typescript";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { UserRoles } from "../types/user.types";

@Table({ tableName: "users", schema: "casa-church", timestamps: true })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(150), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare password: string;

  @Default(UserRoles.USER)
  @Column(DataType.ENUM(...Object.values(UserRoles)))
  declare role: UserRoles;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
