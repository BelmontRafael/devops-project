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
import { User, Event } from "src/models";
import { RegistrationStatus } from "../types/registration.types";

@Table({ tableName: "registrations", schema: "casa-church", timestamps: true })
export class Registration extends Model<Registration> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @ForeignKey(() => Event)
  @Column({ type: DataType.UUID })
  declare eventId: string;

  @Default(RegistrationStatus.PENDING)
  @Column(DataType.ENUM(...Object.values(RegistrationStatus)))
  declare status: RegistrationStatus;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
