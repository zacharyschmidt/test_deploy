import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/categories/category.entity';
import { Repository } from 'typeorm';
import { SeriesEntity } from '../series/series.entity';

@Injectable()
export class UpdateService {
    constructor(
        @InjectRepository(SeriesEntity)
        private seriesRepository: Repository<SeriesEntity>,
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>
    ) { }

    async getOutdatedSeries(ids: string[]): Promise<SeriesEntity[]> {
        try {
            const outdatedSeries = await this.seriesRepository.findByIds(ids);
            return outdatedSeries;
        } catch (err) {
            throw err;
        }
    }

    // call this method from the scheduled task once it has retrieved and processed the EIA
    // data. Series returned by EIA should be processed into an array of SeriesEntities.
    async updateCategory(categories: CategoryEntity[]) {
        try {
            this.categoryRepository.save({ name: 'Annual Energy Outlook 2021', category_id: 4047325, parent_category_id: null, dataset_name: 'Annual Energy Outlook 2021', childSeries: [] })
            this.categoryRepository.save(categories);
            // let ancestors = category.ancestors;
            // delete category.ancestors;
            // let childSeries = category.childSeries;
            // delete category.childSeries;
            // this.categoryRepository.update(category.category_id, category)
            // // this.categoryRepository.query(`UPDATE categories set ancestors = ARRAY{${ancestors}'
            // //                                 WHERE category_id = ${category.category_id}`)
            // // this.categoryRepository.query(`UPDATE categories set childseries = ARRAY{${childSeries}'
            // //                                 WHERE category_id = ${category.category_id}`)
            // this.categoryRepository.query(`UPDATE categories set dataset_name = 'Annual Energy Outlook 2021'
            //                                 WHERE category_id = ${category.category_id}`)
            // this.categoryRepository.query(`UPDATE categories set search_text = concat(name, ' ', dataset_name)
            //                                 WHERE category_id = ${category.category_id}`)
            // this.categoryRepository.query(`UPDATE categories set search_vec = to_tsvector('english', search_text) 
            //                                 WHERE category_id = ${category.category_id}`)
        } catch (err) {
            //console.log(err)
        }
        console.log('SAVE COMPLETE')
    }

    async insertAEOSeries(seriesArray: SeriesEntity[]) {
        try {
            await this.seriesRepository.save(seriesArray);
        } catch (err) {
            console.log(err);
        }
    }
    async updateSeries(updatedSeries: any[]) {//Promise<SeriesEntity[]> {
        //maybe I don't need this
        //const outdatedSeries = await this.getOutdatedSeries(ids);

        // I should check to see if any of these series do not exist in the database!
        // for now just go ahead with the update and run again later with the same data.
        //await this.checkForExistence()
        //const newSeries = this.seriesRepository.create(updatedSeries); 
        console.log(updatedSeries[0].series_id);
        updatedSeries.forEach(series => {
            try {

                this.seriesRepository.update(series.series_id, series)
            } catch (err) {
                console.log(err)
            }
        })


    }
    async makeAncestorsArray(dataset_id: number) {
        this.categoryRepository.query(`WITH RECURSIVE tree (category_id, ancestors, depth, cycle) AS (
            SELECT category_id, '{}'::integer[], 0, FALSE
            FROM categories WHERE category_id = ${dataset_id}
          UNION ALL
            SELECT
              n.category_id, t.ancestors || n.parent_category_id, t.depth + 1,
              n.parent_category_id = ANY(t.ancestors)
            FROM categories n, tree t
            WHERE n.parent_category_id = t.category_id
            AND NOT t.cycle
        )
        UPDATE categories
            SET ancestors = q.ancestors
            FROM ( SELECT t.ancestors, t.category_id FROM tree t) as q
            WHERE categories.category_id = q.category_id;`)
        
    }

    async fillLookupTables(dataset_name: string) {
       await this.categoryRepository.query(`WITH temp_cats_proto AS (
SELECT name, category_id, ancestors, jsonb_array_elements_text(childseries) as series_id
from categories WHERE dataset_name = '${dataset_name}'),
temp_cats AS (
    SELECT t.name, t.category_id, t.ancestors, s.f, s.geography, t.series_id
    FROM temp_cats_proto t inner join series s on t.series_id = s.series_id
), 
interior_treenode_filters_proto AS (
SELECT name, category_id, unnest(ancestors) as ancestors, series_id, f, geography
from temp_cats
),
interior_treenode_filters AS (
SELECT * FROM interior_treenode_filters_proto
UNION
SELECT name, category_id, category_id AS ancestors, series_id, f, geography
FROM interior_treenode_filters_proto
), i_g AS (
INSERT INTO geography_filter
SELECT DISTINCT ancestors as category_id, geography from interior_treenode_filters
), i_f AS (
INSERT INTO frequency_filter
SELECT DISTINCT ancestors as category_id, f from interior_treenode_filters
)
INSERT INTO category_leaf_lookup
select category_id as leaf_category, unnest(ancestors) 
AS ancestors from categories where (jsonb_array_length(childseries) > 0) 
AND (dataset_name = '${dataset_name}');`)
console.log("finished updating lookup tables")
    }
}
