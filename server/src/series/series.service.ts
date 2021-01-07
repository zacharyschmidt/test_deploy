import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeriesEntity } from './series.entity';
import { SeriesSO } from './dto/series.dto';
import { UserEntity } from 'src/user/user.entity';

import { PaginationDto } from "./dto/Pagination.dto"
import { PaginatedSeriesResultDto } from "./dto/PaginatedSeriesResult.dto"

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(SeriesEntity)
    private seriesRepository: Repository<SeriesEntity>,
  ) {}

//   private responseOject = (series: SeriesEntity): SeriesSO => {
//     return {
//       ...series,
    
//     };
//   };



  getSearchedSeries = async (paginationDto: PaginationDto): Promise<PaginatedSeriesResultDto> => {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    console.log('TEST')
    console.log(paginationDto)
    let frequency 
    switch(paginationDto.Frequency) {
      case 'Daily':
        frequency = 'D'
        break;
      case 'Quarterly':
        frequency = 'Q'
        break;
      case 'Monthly':
        frequency = 'M'
        break; 
      case 'Annual':
        frequency = 'A'
        break;
      default:
        frequency = '%';
    }
    let units
    switch(paginationDto.Units) {
      case 'All':
        units = '%'
        break
      default:
        units = paginationDto.Units;
    }
    let dataset;
    switch(paginationDto.DataSet) {
      case 'All':
        dataset = '%'
        break;
    }
    let histProj;
    switch(paginationDto.HistorProj) {
      case 'All':
        histProj = '%'
        break;
    }
    let supDemand;
    switch(paginationDto.SuppDemand) {
      case 'All':
        supDemand = '%'
        break;
    }
    let lastUpdate;
    switch(paginationDto.LastUpdate) {
      case 'All':
        lastUpdate = '%'
        break;
    }

    // const totalCount = await this.seriesRepository.count()
    const totalCount = 10000;
    const series = await this.seriesRepository
        .createQueryBuilder('series')
        // change this to vector query
        .where("series.description LIKE :term", {term: '%' + paginationDto.searchTerm + '%'})
        // then put in region and subregion filters
        .andWhere("series.f LIKE :frequency", {frequency: frequency})
        // need to check units--maybe not matching with data in column
        .andWhere("series.units LIKE :units", {units: units})
        // must make catname column (join with categories . . . ).andWhere("series.catname LIKE :catname"), {catname: dataset}) 
        // make this too .andWhere("series.histProj LIKE :histProj", {histProj: histProj})
        // how to make this? .andWhere("series.SuppDemand LIKE suppDemand")
        //.andWhere("series.LastUpdate LIKE :lastUpdate", {lastUpdate: lastUpdate})
        
        .skip(skippedItems)
        .take(paginationDto.limit)
        .getMany()

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      series: series,
    }
  } 

  getSeriesbyID = async (seriesID: string): Promise<SeriesSO> => {
    const series = await this.seriesRepository
        .createQueryBuilder('series')
        .where("series.series_id = :seriesID", {seriesID: seriesID})
        .getOne()

    return series
}
};
  
