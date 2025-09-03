import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "users",
})
export class User extends Model {
  public static USER_TABLE_NAME = "users" as string;
  public static USER_ID = "user_id" as string;
  public static USER_NAME = "username" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "user_id",
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: "username",
  })
  username!: string;
}