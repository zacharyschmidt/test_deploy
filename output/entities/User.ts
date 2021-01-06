import { Column, Entity, Index, OneToMany } from "typeorm";
import { Todos } from "./Todos";

@Index("UQ_e12875dfb3b1d92d7d7c5377e22", ["email"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("text", { name: "email", unique: true })
  email: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("timestamp without time zone", {
    name: "createdOn",
    default: () => "now()",
  })
  createdOn: Date;

  @OneToMany(() => Todos, (todos) => todos.author)
  todos: Todos[];
}
