import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeriesEntity } from './series.entity';
import { SeriesSO } from './dto/series.dto';
import { UserEntity } from 'src/user/user.entity';

import { PaginationDto } from './dto/Pagination.dto';
import { PaginatedSeriesResultDto } from './dto/PaginatedSeriesResult.dto';
import { async } from 'rxjs';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(SeriesEntity)
    private seriesRepository: Repository<SeriesEntity>
  ) {}

  //   private responseOject = (series: SeriesEntity): SeriesSO => {
  //     return {
  //       ...series,

  //     };
  //   };

  getSearchedSeries = async (
    paginationDto: PaginationDto
  ): Promise<PaginatedSeriesResultDto> => {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    console.log('TEST');
    console.log(paginationDto);
    // I believe this logic should go in the UI--display terms may change more
    // frequently in the UI, and terms are changed more easily there than in the
    // database (for example, changeing 'D' in the database takes thousands of operations,
    // but changing 'Daily' in the UI takes only on). Therefore logic for
    // converting from UI term to database term should go in the UI,
    // because if a change occurs, most likely it will be to UI term,
    // then I make two changes to the UI, not one to the UI and one to the
    // back end code (below)
    let frequency;
    switch (paginationDto.Frequency) {
      case 'Daily':
        frequency = 'D';
        break;
      case 'Quarterly':
        frequency = 'Q';
        break;
      case 'Monthly':
        frequency = 'M';
        break;
      case 'Annual':
        frequency = 'A';
        break;
      default:
        frequency = '%';
    }
    let units;
    switch (paginationDto.Units) {
      case 'All':
        units = '%';
        break;
      default:
        units = paginationDto.Units;
    }
    let geography;
    switch (paginationDto.Region) {
      case 'All':
        geography = '%';
        break;
      default:
        geography = paginationDto.Region;
    }
    let histProj;
    switch (paginationDto.HistorProj) {
      case 'All':
        histProj = '%';
        break;
    }
    let supDemand;
    switch (paginationDto.SuppDemand) {
      case 'All':
        supDemand = '%';
        break;
    }
    let lastUpdate;
    switch (paginationDto.LastUpdate) {
      case 'All':
        lastUpdate = '%';
        break;
    }
    let dataset_name;
    switch (paginationDto.DataSet) {
      case 'All':
        dataset_name = '%';
        break;
      default:
        dataset_name = paginationDto.DataSet;
    }

    // const totalCount = await this.seriesRepository.count()
    const totalCount = 1000;
    const series = await this.seriesRepository
      .createQueryBuilder('series')
      // change this to vector query

      .where('COALESCE(series.f, :string) LIKE :frequency', {
        frequency: frequency,
        string: '',
      })
      .andWhere(
        paginationDto.treeSeries && paginationDto.treeSeries.length > 0
          ? 'series.series_id IN (:...tree_series)'
          : '1=1',
        { tree_series: paginationDto.treeSeries }
      )
      .andWhere(
        paginationDto.searchTerm
          ? 'series.search_vec @@ phraseto_tsquery(:term)'
          : '1=1',
        {
          term: paginationDto.searchTerm,
        }
      )
      // then put in region and subregion filters

      // need to check units--maybe not matching with data in column
      .andWhere('COALESCE(series.units, :string) LIKE :units', {
        units: units,
        string: '',
      })
      .andWhere('COALESCE(series.dataset_name, :string) LIKE :dataset_name', {
        dataset_name: dataset_name,
        string: '',
      })
      .andWhere('COALESCE(series.geography, :string) LIKE :geography', {
        geography: geography,
        string: '',
      })
      // must make catname column (join with categories . . . ).andWhere("series.catname LIKE :catname"), {catname: dataset})
      // make this too .andWhere("series.histProj LIKE :histProj", {histProj: histProj})
      // how to make this? .andWhere("series.SuppDemand LIKE suppDemand")
      //.andWhere("series.LastUpdate LIKE :lastUpdate", {lastUpdate: lastUpdate})

      .skip(skippedItems)
      .take(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      series: series,
    };
  };

  getSeriesbyID = async (seriesID: string): Promise<SeriesSO> => {
    const series = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id = :seriesID', { seriesID: seriesID })
      .getOne();

    return series;
  };

  getManySeries = async (category_id: number, frequency: string, geography: string): Promise<Array<SeriesSO>> => {
    console.log('SERIES SERVICE')
    console.log(frequency, geography)
    const manySeries = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id = any(SELECT jsonb_array_elements_text(childseries) FROM categories WHERE category_id = :category_id)', 
        {category_id: category_id})
      .andWhere('series.f = :frequency', {frequency: frequency})
      .andWhere(
        // (geography = 'All') ? '1=1' : 
        'series.geography = :geography', {geography: geography})
      .getMany()
      //console.log(manySeries)
    return manySeries;
  };
}
