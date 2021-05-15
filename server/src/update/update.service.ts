import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeriesEntity } from '../series/series.entity';

@Injectable()
export class UpdateService {
    constructor(
        @InjectRepository(SeriesEntity)
        private seriesRepository: Repository<SeriesEntity>,
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
    async updateSeries(updatedSeries: any[]){//Promise<SeriesEntity[]> {
        //maybe I don't need this
        //const outdatedSeries = await this.getOutdatedSeries(ids);

        // I should check to see if any of these series do not exist in the database!
        // for now just go ahead with the update and run again later with the same date.
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