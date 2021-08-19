import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeriesEntity } from './series.entity';
import { SeriesSO } from './dto/series.dto';
import { UserEntity } from 'src/user/user.entity';

import { PaginationDto } from './dto/Pagination.dto';
import { PaginatedSeriesResultDto } from './dto/PaginatedSeriesResult.dto';
import { oilProdConsumptionList, oilProdImportList, oilProdExportList } from '../download/utils/rmiSeries';



@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(SeriesEntity)
    private seriesRepository: Repository<SeriesEntity>
  ) { }

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
    switch (paginationDto.HistorProj) {
      case 'All':
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
        paginationDto.treeSeries && paginationDto.treeSeries.length > 0 ?
          'series.series_id IN (:...tree_series)' :
          '1=1',
        { tree_series: paginationDto.treeSeries }
      )
      .andWhere(
        paginationDto.searchTerm ?
          'series.search_vec @@ phraseto_tsquery(:term)' :
          '1=1',
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

  getSeriesbyID = async (series_id: string): Promise<SeriesSO> => {
    const series = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id = :series_id', { series_id: series_id })
      .getOne();

    return series;
  };

  /// This is the only one we use right now.
  getEIASeries = async (category_id: number, frequency: string, geography: string): Promise<Array<SeriesSO>> => {
    console.log('SERIES SERVICE')
    console.log(frequency, geography)
    const manySeries = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id = any(SELECT jsonb_array_elements_text(childseries) FROM categories WHERE category_id = :category_id)',
        { category_id: category_id })
      .andWhere('series.f = :frequency', { frequency: frequency })
      .andWhere(
        // (geography = 'All') ? '1=1' : 
        'series.geography = :geography', { geography: geography })
      .getMany()
    console.log(manySeries)
    return manySeries;
  };

  getManySeries = async (category_id: number, frequency: string, geography: string, custom_flag: string): Promise<Array<SeriesSO>> => {
    switch (custom_flag) {
      case 'custom':
        return this.getCustomUSASeries(category_id, frequency, geography);
      case 'kaya':
        return this.getCustomUSAKayaSeries(category_id, frequency, geography)
      case 'EIA':
        return this.getEIASeries(category_id, frequency, geography);
      case 'AEO2021':
        console.log('AEO2021')

        let ref = await this.getAEO2021KayaSeriesRef(category_id, frequency, geography)
        let lowCost = await this.getAEO2021KayaSeriesLowCostRen(category_id, frequency, geography)

        // this is for the details page
        // download service calls the above functions individually
        // --should I change so details page and download service
        // take same inputs? Then both would simply call 'getManySeries'.
        return [...ref, ...lowCost]
      case 'rmiOilIndex':
        let oilProdConsumption = await this.getOilProdConsumption(oilProdConsumptionList)
        let oilProdImports = await this.getOilProdImports(oilProdConsumptionList)
        let oilProdExports = await this.getOilProdExports(oilProdExportList)

        return [...oilProdConsumption, ...oilProdImports, ...oilProdExports]
      default:
        return this.getEIASeries(category_id, frequency, geography);
    }
  }
  getOilProdConsumption = async (oilProdConsumptionList: string[]): Promise<Array<SeriesSO>> => {

    const oilProdConsumptionSeries = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id IN (:...oilProdConsumptionList)',
        { oilProdConsumptionList: oilProdConsumptionList })
      .getMany()
    console.log(oilProdConsumptionSeries)
    console.log('IN SERIES SERVICE')
    return oilProdConsumptionSeries;
  }

  getOilProdImports = async (oilProdImportList: string[]): Promise<Array<SeriesSO>> => {
    const oilProdImportSeries = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id IN (:...oilProdImportList)',
        { oilProdImportList: oilProdImportList })
      .getMany()
    return oilProdImportSeries;

  }

  getOilProdImportTotals = async (oilProdImportTotalList: string[]): Promise<Array<SeriesSO>> => {
    const oilProdImportTotalSeries = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id IN (:...oilProdImportTotalList)',
        { oilProdImportTotalList: oilProdImportTotalList })
      .getMany()
    return oilProdImportTotalSeries;

  }

  getOilProdExports = async (oilProdExportList: string[]): Promise<Array<SeriesSO>> => {
    const oilProdExportSeries = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id IN (:...oilProdExportList)',
        { oilProdExportList: oilProdExportList })
      .getMany()
    return oilProdExportSeries;

  }

  getCustomUSASeries = async (category_id: number, frequency: string, geography: string): Promise<Array<SeriesSO>> => {
    let us_elec_list = ['TOTAL.TXRCBUS.A', 'TOTAL.ESRCBUS.A',
      'TOTAL.TXCCBUS.A', 'TOTAL.ESCCBUS.A', 'TOTAL.TETCBUS.A',
      'TOTAL.TXICBUS.A', 'TOTAL.ESICBUS.A', 'TOTAL.TXACBUS.A',
      'TOTAL.ESACBUS.A', 'TOTAL.GDPRXUS.A', 'TOTAL.ELTCPUS.A',
      'TOTAL.TERCBUS.A', 'TOTAL.TECCBUS.A', 'TOTAL.TETCBUS.A']
    const manySeries = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id IN (:...us_elec_list)',
        { us_elec_list: us_elec_list })
      .getMany()
    return manySeries;
  };

  getCustomUSAKayaSeries = async (category_id: number, frequency: string, geography: string): Promise<Array<SeriesSO>> => {
    let us_elec_list = ['TOTAL.TXRCBUS.A', 'TOTAL.ESRCBUS.A',
      'TOTAL.TXCCBUS.A', 'TOTAL.ESCCBUS.A', 'TOTAL.TETCBUS.A',
      'TOTAL.TXICBUS.A', 'TOTAL.ESICBUS.A', 'TOTAL.TXACBUS.A',
      'TOTAL.ESACBUS.A', 'TOTAL.GDPRXUS.A', 'TOTAL.ELTCPUS.A',
      'TOTAL.TERCBUS.A', 'TOTAL.TECCBUS.A', 'TOTAL.TETCBUS.A',
      'TOTAL.TPOPPUS.A', 'TOTAL.TEPRBUS.A',
      'TOTAL.NRTCBUS.A', 'TOTAL.NRFUBUS.A', 'TOTAL.NUETBUS.A', //nuclear primary
      'TOTAL.NUETPUS.A', //nuclear electric
      'TOTAL.ESTCKUS.A', // heat content electricity
      'TOTAL.FFTCBUS.A', //PE consumption from fossil fuels
      'TOTAL.TETCEUS.A'  // CO2 emissions from fossil energy
    ]
    const manySeries = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id IN (:...us_elec_list)',
        { us_elec_list: us_elec_list })
      .getMany()
    return manySeries;
  };

  getAEO2021KayaSeriesRef = async (category_id: number, frequency: string, geography: string): Promise<Array<SeriesSO>> => {
    let us_elec_list = ['AEO.2021.REF2021.CNSM_NA_ELEP_NA_TEL_NA_USA_BLNKWH.A', 'AEO.2021.REF2021.CNF_NA_NA_NA_ELC_NA_NA_BTUPKWH.A',
      'AEO.2021.REF2021.CNSM_ENU_ALLS_NA_DELE_DELV_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_ENU_TEN_NA_TOT_NA_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_ENU_TEN_NA_BFH_NA_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_ENU_TEN_NA_NUC_NA_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_ENU_TEN_NA_NBMSW_NA_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_ENU_TEN_NA_HDG_NA_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_ENU_TEN_NA_PCF_NA_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_ENU_TEN_NA_ELI_NA_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_ENU_TEN_NA_REN_NA_NA_QBTU.A',

      'AEO.2021.REF2021.KEI_GDP_NA_NA_NA_NA_NA_BLNY09DLR.A',
      'AEO.2021.REF2021.GEN_NA_NA_NA_NA_NA_NA_BLNKWH.A',
      'AEO.2021.REF2021.GEN_NA_NA_NA_MUNWST_NA_NA_BLNKWH.A',
      'AEO.2021.REF2021.GEN_NA_NA_NA_WBM_NA_NA_BLNKWH.A',
      'AEO.2021.REF2021.CNSM_NA_NA_NA_RNW_NA_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_NA_NA_NA_MUNWST_NA_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_NA_NA_NA_WBM_NA_NA_QBTU.A',
      'AEO.2021.REF2021.CNSM_ENU_TEN_NA_NUC_NA_NA_QBTU.A',
      'AEO.2021.REF2021.GEN_NA_ELEP_TGE_NUP_NA_USA_BLNKWH.A',
      'AEO.2021.REF2021.CNSM_ENU_TEN_NA_TEU_NA_NA_QBTU.A',
      'AEO.2021.REF2021.EMI_CO2_NA_NA_NA_NA_NA_MILLMTCO2EQ.A',
      'AEO.2021.REF2021.DMG_POP_NA_NA_NA_NA_NA_MILL.A',
    ]
    const manySeries = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id IN (:...us_elec_list)',
        { us_elec_list: us_elec_list })
      .getMany()
    return manySeries;
  };

  getAEO2021KayaSeriesLowCostRen = async (category_id: number, frequency: string, geography: string): Promise<Array<SeriesSO>> => {
    const us_elec_list = ['AEO.2021.LORENCST.CNSM_NA_ELEP_NA_TEL_NA_USA_BLNKWH.A', 'AEO.2021.LORENCST.CNF_NA_NA_NA_ELC_NA_NA_BTUPKWH.A',
      'AEO.2021.LORENCST.CNSM_ENU_ALLS_NA_DELE_DELV_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_ENU_TEN_NA_TOT_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_ENU_TEN_NA_BFH_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_ENU_TEN_NA_NUC_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_ENU_TEN_NA_NBMSW_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_ENU_TEN_NA_HDG_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_ENU_TEN_NA_PCF_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_ENU_TEN_NA_ELI_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_ENU_TEN_NA_REN_NA_NA_QBTU.A',

      'AEO.2021.LORENCST.KEI_GDP_NA_NA_NA_NA_NA_BLNY09DLR.A',
      'AEO.2021.LORENCST.GEN_NA_NA_NA_NA_NA_NA_BLNKWH.A',
      'AEO.2021.LORENCST.GEN_NA_NA_NA_MUNWST_NA_NA_BLNKWH.A',
      'AEO.2021.LORENCST.GEN_NA_NA_NA_WBM_NA_NA_BLNKWH.A',
      'AEO.2021.LORENCST.CNSM_NA_NA_NA_RNW_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_NA_NA_NA_MUNWST_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_NA_NA_NA_WBM_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.CNSM_ENU_TEN_NA_NUC_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.GEN_NA_ELEP_TGE_NUP_NA_USA_BLNKWH.A',
      'AEO.2021.LORENCST.CNSM_ENU_TEN_NA_TEU_NA_NA_QBTU.A',
      'AEO.2021.LORENCST.EMI_CO2_NA_NA_NA_NA_NA_MILLMTCO2EQ.A',
      'AEO.2021.LORENCST.DMG_POP_NA_NA_NA_NA_NA_MILL.A',
    ]
    const manySeries = await this.seriesRepository
      .createQueryBuilder('series')
      .where('series.series_id IN (:...us_elec_list)',
        { us_elec_list: us_elec_list })
      .getMany()
    return manySeries;
  };

  getRMI = async (): Promise<SeriesSO> => {
    const series_id = 'PET.MGFUPUS1.M';
    const motorGasoline =
      await this.seriesRepository
        .createQueryBuilder('series')
        .where('series.series_id = :series_id', { series_id: series_id })
        .getOne();
    //reverse data array
    motorGasoline.data.reverse();

    return motorGasoline;

  }
}
