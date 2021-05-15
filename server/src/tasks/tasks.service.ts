import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { map } from 'rxjs/operators';

import { UpdateService } from '../update/update.service';
import { SeriesEntity } from '../series/series.entity';

@Injectable()
export class TasksService {
    constructor(private httpService: HttpService, private updateService: UpdateService) { }
    private readonly logger = new Logger(TasksService.name);

    // make api call to eia, get updated series
    // process those series into an array of Series entities
    // call the update series service with that array as a parameter. 
    // @Cron('45 * * * * *')
    // handleCron() {
    //     this.logger.debug('Called when the second is 45');
    // }

    // @Interval(10000)
    // handleInterval() {
    //     this.logger.debug('Called every 10 seconds');
    // }

    @Timeout(5000)
    async handleTimeout() {
        this.logger.debug('Called once after 5 seconds');
        let seriesArray: Array<string> = [];
        let i = 0;
        let num_found;
        //do while?
        // make request, get number of records, divide by records per page,
        //while loop for all pages,add the ids to the series array on each
        //loop. then get the full SeriesEntities for all those ids and send the 
        // array to the update service.
        do {
        const newSeries = await this.httpService.get(
            `https://api.eia.gov/search/?search_term=last_updated&rows_per_page=10000&page_num=${i}&frequency=A&search_value=[2020-01-01T00:00:00Z TO 2021-05-14T23:59:59Z]`
            //'http://api.eia.gov/updates/?api_key=d329ef75e7dfe89a10ea25326ada3c43&deep=true&rows=100&out=json'
        ).toPromise();
        //seriesArray = ['test']
        num_found = newSeries.data.response.numFound;
        seriesArray = seriesArray.concat(newSeries.data.response.docs.map(doc => doc.series_id))
        //console.log(seriesArray.concat(newSeries.data.response.docs.map(doc => doc.series_id)))
        
        console.log(i)
        i++
        } while (i < 2)//i * 10000 < num_found + 10000);
        console.log(seriesArray[9])
    
    const seriesString = seriesArray.slice(0, 100).join(';')
    // should use error handling
    const fullSeries = await this.httpService.get(
        `http://api.eia.gov/series/?series_id=${seriesString}&api_key=d329ef75e7dfe89a10ea25326ada3c43`
    ).toPromise();
    

    console.log(fullSeries.data.series[0])
    this.updateService.updateSeries([fullSeries.data.series[0]])
}
}