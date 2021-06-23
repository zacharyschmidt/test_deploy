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

  @Column('text', { name: 'parent_name', nullable: true })
  parent_name: string | null

  @Column('text', { name: 'notes', nullable: true })
  notes: string | null;

  @Column('jsonb', { name: 'childseries', nullable: true })
  // should by string array?
  childseries: string[] | null;

  @Column('text', { name: 'dataset_name', nullable: true })
  dataset_name: string | null;

  @Column('jsonb', { name: 'ancestors', nullable: true })
  ancestors: number[] | null;

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



@Entity('temp_cats', { schema: 'public' })
export class TempCatsEntity {
  @Column('text', { primary: true, name: 'series_id' })
  series_id: string

  @Column('integer', { name: 'category_id' })
  category_id: number;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('jsonb', { name: 'ancestors', nullable: true })
  ancestors: number[] | null;


  @Column('text', { name: 'f', nullable: true })
  f: string | null;

  @Column('text', { name: 'geography', nullable: true })
  geography: string | null;
}

@Entity('frequency_filter', { schema: 'public' })
export class FrequencyFilterEntity {

  @Column('integer', { primary: true, name: 'id' })
  id: number

  @Column('integer', { name: 'category_id' })
  category_id: number;

  @Column('text', { name: 'f', nullable: true })
  f: string | null;

}

@Entity('geography_filter', { schema: 'public' })
export class GeographyFilterEntity {
  @Column('integer', { primary: true, name: 'id' })
  id: number

  @Column('integer', { name: 'category_id' })
  category_id: number;

  @Column('text', { name: 'geography', nullable: true })
  f: string | null;

}

@Entity('category_leaf_lookup', { schema: 'public' })
export class CategoryLeafLookupEntity {

  @Column('integer', { primary: true, name: 'id' })
  id: number

  @Column('integer', { name: 'leaf_category' })
  leaf_category: number;

  @Column('integer', { name: 'ancestors', nullable: true })
  ancestors: number

}
