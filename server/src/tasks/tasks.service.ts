import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { map } from 'rxjs/operators';
const zlib = require('zlib');
const { pipeline } = require('stream');
const fs = require('fs');
const request = require('superagent')
const admZip = require('adm-zip');

import { UpdateService } from '../update/update.service';
import { CategoryEntity } from '../categories/category.entity';

@Injectable()
export class TasksService {
    constructor(private httpService: HttpService, private updateService: UpdateService) { }
    private readonly logger = new Logger(TasksService.name);

    // make api call to eia, get updated series
    // process those series into an array of Series entities
    // call the update series service with that array as a parameter. 
    // 
    // handleCron() {
    //     this.logger.debug('Called when the second is 45');
    // }

    // @Interval(10000)
    // handleInterval() {
    //     this.logger.debug('Called every 10 seconds');
    // }
    async BulkDownload(accessURL) {
        const text = await this.httpService.get(
            `${accessURL}`, {
            'responseType': 'stream',
            headers: { 'Accept-Encoding': 'br,gzip,deflate,zip' }
        }
        ).toPromise();
        console.log(text.headers)


        const onError = (err) => {
            if (err) {
                console.error('An error occurred:', err);
                process.exitCode = 1;
            }
        };
        let zipFile = 'aeo2021.zip'
        // using an arrow function for the callback argument to .on resolved 
        // issues with 'this' when I call this.updateService.UpdateCategory
        text.data.on('error', onError).pipe(fs.createWriteStream(zipFile))
            .on('finish', async () => {
                let zip = admZip(zipFile);
                console.log('get entries');
                let zipEntries = zip.getEntries();
                let AEO;
                zipEntries.forEach(function (zipEntry) {
                    //console.log(zipEntry.name);
                    if (zipEntry.entryName === 'AEO2021.txt') {

                        AEO = zipEntry.getData().toString('utf8');
                    }
                })
                let AEOarray = AEO.split('\n')
                console.log(AEOarray.length)
                //console.log(AEOarray[136320])

                AEOarray.pop()


                function checkCat(element, index) {
                    //console.log(index)

                    let JsonElement = JSON.parse(element);
                    return !JsonElement.series_id
                }
                /* Get AEO 2021 categories */
                let catsArray = AEOarray.filter(checkCat)
                    .map((catString) => {
                        let cat = JSON.parse(catString);
                        const { childseries, ...otherProps } = cat;
                        let catUpdate = { childSeries: childseries, ...otherProps };
                        catUpdate.dataset_name = 'Annual Energy Outlook 2021';
                        if (catUpdate.category_id === '4047325') {
                            catUpdate.parent_category_id = null;
                            console.log('FOUND ROOT CAT')
                        } else {
                            console.log('Root Cat Not Found')
                        }
                        return catUpdate;
                    })
                //console.log(catsArray.slice(0, 10))
                await this.updateService.updateCategory(catsArray);
                
                /* Make Ancestors Array */
                await this.updateService.makeAncestorsArray(4047325)
                /* This gets series from the update API */
                await this.getSeries(4047325);

                
                function checkSeries(element, index) {
                   

                    let JsonElement = JSON.parse(element);
                    return !JsonElement.category_id;
                }

                /* This gets series from text file */
                // let seriesArray = AEOarray.filter(checkSeries)
                //     .map((seriesString) => {
                //         let series = JSON.parse(seriesString);
                //         delete series.lastHistoricalPeriod;
                //         series.dataset_name = 'Annual Energy Outlook 2021'; 
                //         return series;
                //     })
                // this.updateService.insertAEOSeries(seriesArray)

               
                // now populate the tables. 
                // I might have to make the callback in .on async so that 
                // I can await this.getSeries (and the method to update categories)
                // if this gives me trouble I can comment things out and 
                // run step by step on the server.
                // mixing callbacks and async/await seems tricky

            await this.updateService.fillLookupTables('Annual Energy Outlook 2021');
            console.log('finished lookup table update')
            })
        
        //pipeline(text, unzip, process.stdout, onError)
        //text.pipe(unzip).pipe(process.stdout)
        //forEach(record => {
        //if its a category process one way, if its a series process another
        //})
        //process text:
        // separate categories from series
        // for categories, 
        // 1. change childseries to childSeries
        // 2. add dataset_name property to object
        // 3. then send to update service
        //    --update service will insert the new categories and then 
        // fill search_text, search_vec, Ancestors, and parent_name fields
        // using SQL I have already written, limiting everything by 
        // 'WHERE dataset_name = 'Annual Energy Outlook 2021'

        // what about geography filter, frequency filter, category_leaf_lookup?
        // I should look at the sql I wrote before, think about how to limit by 
        //dataset_name - 'Annual Energy Outlook 2021'

        //for childSeries:
        // 1. delete lastHistoricalPeriod
        // 2. set dataset_name property
        

    }
    async AEO2021Query(category_id, ancestorsArray, parent_name) {
        console.log('before get category')
        //parent_name = parent_name.replace(/"/g, "'")
        let category

        try {
            category = await this.httpService.get(
                //'https://api.github.com'
                "https://api.eia.gov/category/?api_key=d329ef75e7dfe89a10ea25326ada3c43&category_id=4049583"
                //`http://api.eia.gov/category/?api_key=d329ef75e7dfe89a10ea25326ada3c43&category_id=${category_id}`
            ).toPromise()
            console.log(category)
            console.log('waiting 10 seconds')
            await new Promise(resolve => setTimeout(resolve, 10000))
            console.log('finished waiting')

        } catch (err) {
            console.error(err)
        }
        console.log('after get category')
        // call updateService.updateCats
        // const { childseries, ...otherProps } = category.data.category;
        // let series_ids = childseries.map((series) => {series.series_id});
        // let catUpdate = { childSeries: series_ids, ...otherProps };
        // catUpdate.ancestors = ancestorsArray;
        // catUpdate.parent_name = parent_name;
        // delete catUpdate.childcategories;
        // console.log(catUpdate.childSeries)
        // console.log(catUpdate);


        // await this.updateService.updateCategory(catUpdate)
        // console.log(category.data.category.name)

        // update all the categories childseries
        // const seriesArray = category.data.category.childseries;
        // let i: number;
        // while ((i + 1) * 100 <= seriesArray.length) {
        //     const seriesString = seriesArray.slice(i * 100, ((i + 1) * 100)).join(';')
        //     // should use error handling
        //     const fullSeries = await this.httpService.get(
        //         `http://api.eia.gov/series/?series_id=${seriesString}&api_key=d329ef75e7dfe89a10ea25326ada3c43`
        //     ).toPromise();
        //     i++;
        //     await this.updateService.updateSeries(fullSeries.data.series)
        //     console.log((i + 1) * 100)
        //     //console.log(seriesString)
        // }

        // if (category.data.category.childcategories.length > 0) {
        //     ancestorsArray.push(category_id);
        // }
        // console.log(ancestorsArray)
        // category.data.category.childcategories.forEach((childcat) => {
        //     this.AEO2021Query(childcat.category_id, ancestorsArray, category.data.category.name)
        // })

        // remove the ategory id from the array after we have iterated through all
        // its decendants. This allows us to move on to a peer of the current category
        // without incorrectly recording the current category as an ancestor.
        ancestorsArray.pop();
    }
   // @Timeout(1000)
    async getAEO2021Task() {

        console.log('starting task')
        await this.BulkDownload('http://api.eia.gov/bulk/AEO2021.zip')
        //let ancestorsArray = [];

        //await this.AEO2021Query(4047325, ancestorsArray, 'None');
        console.log('finished AEO update')
    }

    //@Timeout(5000)
    //@Cron('45 51 6 15 5 *')
    async getSeries(category_id: number) {
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
                //`https://api.eia.gov/search/?search_term=last_updated&rows_per_page=10000&page_num=${i}&frequency=A&category_id=711224&search_value=[2021-01-01T00:00:00Z TO 2021-05-14T23:59:59Z]`
                // first just update total. then update others using the same form of query without
                // category specified.
                `https://api.eia.gov/updates/?api_key=d329ef75e7dfe89a10ea25326ada3c43&category_id=${category_id}&deep=true&rows=10000&firstrow=${i * 10000}`
                //'http://api.eia.gov/updates/?api_key=d329ef75e7dfe89a10ea25326ada3c43&deep=true&rows=100&out=json'
            ).toPromise();
            //seriesArray = ['test']
            //console.log(newSeries)
            num_found = newSeries.data.data.rows_returned;
            //console.log(num_found)
            seriesArray = seriesArray.concat(newSeries.data.updates.map(update => update.series_id))
            //console.log(seriesArray.concat(newSeries.data.response.docs.map(doc => doc.series_id)))

            //console.log(seriesArray.length)
            i++
            //console.log(i)
        } while (i * 10000 < num_found + 10000);
        //console.log(seriesArray[9]) 
        i = 0
        while ((i + 1) * 100 <= seriesArray.length) {
            const seriesString = seriesArray.slice(i * 100, ((i + 1) * 100)).join(';')
            // should use error handling
            const fullSeries = await this.httpService.get(
                `http://api.eia.gov/series/?series_id=${seriesString}&api_key=d329ef75e7dfe89a10ea25326ada3c43`
            ).toPromise();
            //console.log(fullSeries.data.series[0])
            let updates = fullSeries.data.series.map((series) => {
                series.dataset_name = 'Annual Energy Outlook 2021';
                delete series.lastHistoricalPeriod;
                // AEO series don't have geography field
                if (series.series_id.includes('AEO.2021') && series.series_name.includes('United States')) {
                    series.geography = 'USA';
                }
                //console.log(series)
                return series
            })
            console.log(updates)
            // insertAEOSeries uses repository.save (use this one)
            await this.updateService.insertAEOSeries(updates)
            // updateSeries uses repository.update
            //await this.updateService.updateSeries(updates)
            console.log((i + 1) * 100)
            //console.log(seriesString)
         i++;   
        }
        
    }
}