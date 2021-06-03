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
            console.log(err)
        }
        console.log('SAVE COMPLETE')
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
}