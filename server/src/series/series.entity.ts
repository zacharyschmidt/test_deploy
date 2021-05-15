import { Column, Entity, Index } from 'typeorm';

@Index('series_pkey', ['series_id'], { unique: true })
@Entity('series', { schema: 'public' })
export class SeriesEntity {
  @Column('character varying', {
    primary: true,
    name: 'series_id',
    length: 120,
  })
  series_id: string;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('character varying', { name: 'units', nullable: true, length: 120 })
  units: string | null;

  @Column('character varying', { name: 'f', nullable: true, length: 120 })
  f: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('character varying', {
    name: 'copyright',
    nullable: true,
    length: 120,
  })
  copyright: string | null;

  @Column('text', { name: 'source', nullable: true })
  source: string | null;

  @Column('character varying', { name: 'iso3166', nullable: true, length: 120 })
  iso3166: string | null;

  @Column('text', { name: 'geography', nullable: true })
  geography: string | null;

  @Column('character varying', { name: 'start', nullable: true, length: 120 })
  start: string | null;

  @Column('character varying', { name: 'end', nullable: true, length: 120 })
  end: string | null;

  @Column('timestamp with time zone', { name: 'last_updated', nullable: true })
  lastUpdated: Date | null;

  @Column('character varying', {
    name: 'geoset_id',
    nullable: true,
    length: 120,
  })
  geosetID: string | null;

  @Column('jsonb', { name: 'data', nullable: true })
  data: object | null;

  @Column('text', {
    name: 'dataset_name',
    nullable: true,
  })
  dataset_name: string | null;
}
