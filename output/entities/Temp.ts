import { Column, Entity } from "typeorm";

@Entity("temp", { schema: "public" })
export class Temp {
  @Column("jsonb", { name: "tempjson" })
  tempjson: object;
}
