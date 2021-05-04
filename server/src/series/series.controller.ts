import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';

import { SeriesService } from './series.service';
import { PaginationDto } from './dto/Pagination.dto';

@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Get('search')
  getSearchedSeries(@Query() paginationDto: PaginationDto) {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    console.log(paginationDto);
    return this.seriesService.getSearchedSeries({
      ...paginationDto,
      //limit: paginationDto.limit > 10 ? 10 : paginationDto.limit
    });
  }
  @Get('childseries')
  getManySeries(@Query('category_id') category_id: number,
    @Query('frequency') frequency: string, @Query('geography') geography: string) {
    const series = this.seriesService.getManySeries(category_id, frequency, geography);
    console.log(series);
    return series;
  }
 @Get('custom_childseries')
  getCustomSeries(@Query('category_id') category_id: number,
    @Query('frequency') frequency: string, @Query('geography') geography: string) {
    const series = this.seriesService.getCustomSeries(category_id, frequency, geography);
    console.log(series);
    return series;
  } 
  @Get('dataset')
  getSeriesbyID(@Query('seriesID') seriesID: string) {
    return this.seriesService.getSeriesbyID(seriesID);
  }
}
