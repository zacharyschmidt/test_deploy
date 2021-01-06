import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("todos", { schema: "public" })
export class Todos {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

  @Column("timestamp without time zone", {
    name: "createdOn",
    default: () => "now()",
  })
  createdOn: Date;

  @Column("boolean", { name: "completed", default: () => "false" })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn([{ name: "authorId", referencedColumnName: "id" }])
  author: User;
}
