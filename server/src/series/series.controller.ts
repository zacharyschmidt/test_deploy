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
  Logger,
} from '@nestjs/common';

import { SeriesService } from './series.service';
import { PaginationDto } from './dto/Pagination.dto';

import { LoginGuard } from 'src/shared/auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) { }
  private readonly logger = new Logger(SeriesController.name);

  @Get('search')
  @UseGuards(new LoginGuard())
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
  @UseGuards(new LoginGuard())
  getManySeries(@Query('category_id') category_id: number,
    @Query('frequency') frequency: string, @Query('geography') geography: string,
    @Query('custom_flag') custom_flag: string) {
    const series = this.seriesService.getManySeries(category_id, frequency, geography, custom_flag);
    console.log(series);
    return series;
  }
  //  @Get('custom_childseries')
  //   getCustomSeries(@Query('category_id') category_id: number,
  //     @Query('frequency') frequency: string, @Query('geography') geography: string,
  //     @Query('custom_flag') custom_flag: string) {
  //     const series = this.seriesService.getCustomSeries(category_id, frequency, geography, custom_flag);
  //     console.log(series);
  //     return series;
  //   }

  //don't need this
  // @Get('AEO2021Kaya')
  // getAEO2021Kaya(@Query('category_id') category_id: number,
  // @Query('frequency') frequency: string, @Query('geography') geography: string,
  // @Query('custom_flag') custom_flag: string) {

  // }
  @Get('dataset')
  @UseGuards(new LoginGuard())
  getSeriesbyID(@Query('series_id') series_id: string) {
    return this.seriesService.getSeriesbyID(series_id);
  }

  @Get('rmi')
  @UseGuards(AuthGuard('api-key'))
  getPetData(@Req() req) {
    this.logger.log(req)

    return this.seriesService.getRMI()
  }

}

