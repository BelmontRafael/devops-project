import {
  BelongsTo,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  UpdatedAt,
} from "sequelize-typescript";
import { Table, Column, Model } from "sequelize-typescript";
import { User, Location } from "src/models";

@Table({ tableName: "events", schema: "casa-church", timestamps: true })
export class Event extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare title: string;

  @Column({ type: DataType.STRING(500) })
  declare description: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare startDate: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  declare endDate: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare createdBy: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @ForeignKey(() => Location)
  @Column({ type: DataType.UUID })
  declare locationId: string;

  @BelongsTo(() => Location)
  declare location: Location;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare image: string;
}
