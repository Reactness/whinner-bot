import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  userName: string;

  @Column
  createdAt: Date;
}