import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Tree,
  TreeParent,
} from 'typeorm';

// @Tree('nested-set')
@Index('categories_pkey', ['category_id'], { unique: true })
@Entity('categories', { schema: 'public' })
export class CategoryEntity {
  @Column('integer', { primary: true, name: 'category_id' })
  category_id: number;

  @Column('integer', { name: 'parent_category_id', nullable: true })
  parent_category_id: number | null;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'notes', nullable: true })
  notes: string | null;

  @Column('jsonb', { name: 'childseries', nullable: true })
  childseries: object | null;

  @Column('text', { name: 'dataset_name', nullable: true })
  dataset_name: string | null;

  @ManyToOne(
    () => CategoryEntity,
    categories => categories.categories,
    {
      onDelete: 'CASCADE',
    }
  )

  // @TreeParent()
  @JoinColumn([
    { name: 'parent_category_id', referencedColumnName: 'category_id' },
  ])
  parentCategory: CategoryEntity;

  @OneToMany(
    () => CategoryEntity,
    categories => categories.parentCategory
  )
  categories: CategoryEntity[];
}
