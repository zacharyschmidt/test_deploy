import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Index("categories_pkey", ["categoryId"], { unique: true })
@Entity("categories", { schema: "public" })
export class Categories {
  @Column("integer", { primary: true, name: "category_id" })
  categoryId: number;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("text", { name: "notes", nullable: true })
  notes: string | null;

  @Column("jsonb", { name: "childseries", nullable: true })
  childseries: object | null;

  @ManyToOne(() => Categories, (categories) => categories.categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "parent_category_id", referencedColumnName: "categoryId" },
  ])
  parentCategory: Categories;

  @OneToMany(() => Categories, (categories) => categories.parentCategory)
  categories: Categories[];
}
