import {
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  UpdatedAt,
} from "sequelize-typescript";
import { Table, Column, Model } from "sequelize-typescript";
import { User, Event } from "src/models";

@Table({
  tableName: "event_feedbacks",
  schema: "casa-church",
  timestamps: true,
  updatedAt: false,
})
export class EventFeedback extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Event)
  @Column({ type: DataType.UUID })
  declare eventId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  declare rating: number;

  @Column({ type: DataType.STRING(250) })
  declare comment: string;

  @CreatedAt
  declare createdAt: Date;
}
