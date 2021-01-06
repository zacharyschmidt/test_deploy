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
    const totalCount = await this.seriesRepository.count()
    const series = await this.seriesRepository
        .createQueryBuilder('series')
        .where("series.description LIKE :term", {term: '%' + paginationDto.searchTerm + '%'})
        .offset(skippedItems)
        .limit(paginationDto.limit)
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
  
