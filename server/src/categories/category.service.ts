import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { FrequencyFilterEntity } from './category.entity';
import { CategorySO } from './dto/category.dto';
import { UserEntity } from 'src/user/user.entity';

import { PaginationDto } from './dto/Pagination.dto';
import { PaginatedCategoryResultDto } from './dto/PaginatedCategoryResult.dto';

let menu_options_logical = ['USA', "AFG",
  "ALB",
  "DZA",
  "ASM",
  "AND",
  "AGO",
  "AIA",
  "ATA",
  "ATG",
  "ARG",
  "ARM",
  "ABW",
  "AUS",
  "AUT",
  "AZE",
  "BHS",
  "BHR",
  "BGD",
  "BRB",
  "BLR",
  "BEL",
  "BLZ",
  "BEN",
  "BMU",
  "BTN",
  "BOL",
  "BOL",
  "BIH",
  "BWA",
  "BVT",
  "BRA",
  "IOT",
  "BRN",
  "BRN",
  "BGR",
  "BFA",
  "BDI",
  "KHM",
  "CMR",
  "CAN",
  "CPV",
  "CYM",
  "CAF",
  "TCD",
  "CHL",
  "CHN",
  "CXR",
  "CCK",
  "COL",
  "COM",
  "COG",
  "COD",
  "COK",
  "CRI",
  "CIV",
  "CIV",
  "HRV",
  "CUB",
  "CYP",
  "CZE",
  "DNK",
  "DJI",
  "DMA",
  "DOM",
  "ECU",
  "EGY",
  "SLV",
  "GNQ",
  "ERI",
  "EST",
  "ETH",
  "FLK",
  "FRO",
  "FJI",
  "FIN",
  "FRA",
  "GUF",
  "PYF",
  "ATF",
  "GAB",
  "GMB",
  "GEO",
  "DEU",
  "GHA",
  "GIB",
  "GRC",
  "GRL",
  "GRD",
  "GLP",
  "GUM",
  "GTM",
  "GGY",
  "GIN",
  "GNB",
  "GUY",
  "HTI",
  "HMD",
  "VAT",
  "HND",
  "HKG",
  "HUN",
  "ISL",
  "IND",
  "IDN",
  "IRN",
  "IRQ",
  "IRL",
  "IMN",
  "ISR",
  "ITA",
  "JAM",
  "JPN",
  "JEY",
  "JOR",
  "KAZ",
  "KEN",
  "KIR",
  "PRK",
  "KOR",
  "KOR",
  "KWT",
  "KGZ",
  "LAO",
  "LVA",
  "LBN",
  "LSO",
  "LBR",
  "LBY",
  "LBY",
  "LIE",
  "LTU",
  "LUX",
  "MAC",
  "MKD",
  "MDG",
  "MWI",
  "MYS",
  "MDV",
  "MLI",
  "MLT",
  "MHL",
  "MTQ",
  "MRT",
  "MUS",
  "MYT",
  "MEX",
  "FSM",
  "MDA",
  "MCO",
  "MNG",
  "MNE",
  "MSR",
  "MAR",
  "MOZ",
  "MMR",
  "MMR",
  "NAM",
  "NRU",
  "NPL",
  "NLD",
  "ANT",
  "NCL",
  "NZL",
  "NIC",
  "NER",
  "NGA",
  "NIU",
  "NFK",
  "MNP",
  "NOR",
  "OMN",
  "PAK",
  "PLW",
  "PSE",
  "PAN",
  "PNG",
  "PRY",
  "PER",
  "PHL",
  "PCN",
  "POL",
  "PRT",
  "PRI",
  "QAT",
  "REU",
  "ROU",
  "RUS",
  "RUS",
  "RWA",
  "SHN",
  "KNA",
  "LCA",
  "SPM",
  "VCT",
  "VCT",
  "VCT",
  "WSM",
  "SMR",
  "STP",
  "SAU",
  "SEN",
  "SRB",
  "SYC",
  "SLE",
  "SGP",
  "SVK",
  "SVN",
  "SLB",
  "SOM",
  "ZAF",
  "SGS",
  "SSD",
  "ESP",
  "LKA",
  "SDN",
  "SUR",
  "SJM",
  "SWZ",
  "SWE",
  "CHE",
  "SYR",
  "TWN",
  "TWN",
  "TJK",
  "TZA",
  "THA",
  "TLS",
  "TGO",
  "TKL",
  "TON",
  "TTO",
  "TUN",
  "TUR",
  "TKM",
  "TCA",
  "TUV",
  "UGA",
  "UKR",
  "ARE",
  "GBR",
  "UMI",
  "URY",
  "UZB",
  "VUT",
  "VEN",
  "VEN",
  "VNM",
  "VNM",
  "VGB",
  "VIR",
  "WLF",
  "ESH",
  "YEM",
  "ZMB",
  "ZWE"];

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,

  ) { }

  //   private responseOject = (series: SeriesEntity): SeriesSO => {
  //     return {
  //       ...series,

  //     };
  //   };

  getSearchedCategories = async (
    paginationDto: PaginationDto
  ): Promise<PaginatedCategoryResultDto> => {


    if (paginationDto.treeNode) {
      try {

        //   `WITH RECURSIVE tree (category_id, ancestors, depth, cycle) AS (
        //       SELECT category_id, '{}'::integer[], 0, FALSE
        //       FROM categories WHERE parent_category_id IS NULL
        //     UNION ALL
        //       SELECT
        //         n.category_id, t.ancestors || n.parent_category_id, t.depth + 1,
        //         n.parent_category_id = ANY(t.ancestors)
        //       FROM categories n, tree t
        //       WHERE n.parent_category_id = t.category_id
        //       AND NOT t.cycle
        //   ) SELECT category_id FROM categories n INNER JOIN tree USING (category_id)
        //   WHERE $1 = any(ancestors)`,
        //   [paginationDto.treeNode]
        // );
      } catch (error) {
        console.log(error);
      }
    }

    //console.log(descendants)
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;


    let region = 'USA';
    let searchTerm = '';
    if (paginationDto.searchTerm) {
      searchTerm = paginationDto.searchTerm
    }
    let parent_category_id;
    if (paginationDto.parent_category_id) {
      parent_category_id = Number(paginationDto.parent_category_id);
    } else {
      parent_category_id = 371;
    }
    // const totalCount = await this.seriesRepository.count()

    // const tempCats = await this.tempCatsRepository
    //   .createQueryBuilder('temp_cats')
    //   .select('temp_cats.geography') 
    //   .where('temp_cats.category_id = :category_id', {category_id: })
    //   .where
    let excluded_list = [//AEO 2020
      3604312, 3604307, 3604309, 3604310, 3604306, 3604311, 3604314, 3604308,
      // AEO 2014
      1019945, 1019952, 1019936, 1019950, 964167, 1019955, 1019937, 1019940, 1019943, 1019944, 1019951, 1019956,
      1019953, 1019957, 1019946, 1019960, 1019935, 1019938, 1019961, 1019934, 1019939, 1019959, 1019958, 1019954,
      964168, 1019942, 964169, 1019933,
      //AEO 2015
      1370526,
      1370524,
      1370529,
      1370528,
      1370525,
      1370527,
      //AEO 2016
      2102242,
      2102244,
      2102240,
      2102239,
      2102238,
      2102236,
      2102237,
      2102243,
      2112192,
      2113095,
      2113110,
      2113097,
      2113099,
      2113096,
      2113109,
      2113098,
      2113100,
      2102235,
      2102241,
      //AEO 2017
      2227121,
      2227115,
      2227117,
      2227119,
      2397068,
      2227116,
      2227118,
      2227120,
      //AEO 2018
      2783667,
      2656298,
      2641376,
      2824166,
      2824167,
      2641369,
      2804640,
      2811053,
      2641363,
      2641370,
      2641365,
      2641372,
      2641367,
      2641374,
      2783665,
      2783666,
      2811052,
      2641364,
      2641371,
      2641366,
      2641373,
      2641368,
      2641375,
      2783663,
      2783664,
      2811051,
      2804637,
      2804638,
      2783661,
      2783662,
      2804641,
      //AEO 2019
      3161920,
      3161922,
      3161924,
      3161921,
      3161923,
      3161925,
    ]

    // make list of dataset ids that match the hist or proj filter
    let hist_or_proj_names = [];
    if (paginationDto.HistorProj === 'Historical') {
      hist_or_proj_names = ['Coal', 'Electricity', 'International Energy Data',
        'Natural Gas', 'Petroleum', 'State Energy Data System (SEDS)', 'Crude Oil Imports'];
    } else if (paginationDto.HistorProj === 'Projection') {
      hist_or_proj_names = ['Annual Energy Outlook 2014', 'Annual Energy Outlook 2015',
        'Annual Energy Outlook 2016', 'Annual Energy Outlook 2017', 'Annual Energy Outlook 2018',
        'Annual Energy Outlook 2019', 'Annual Energy Outlook 2020', 'Annual Energy Outlook 2021',
        'Short-Term Energy Outlook', 'International Energy Outlook'];
    }
    // make one query for tree, one for keyword search
    let categories;
    let count;
    // tree builder
    if (paginationDto.parent_category_id) {
      categories = await this.categoryRepository

        // right now the inner joins with the filter tables exclude any of the 
        // 13000 categories that are missing from at least one of the filter tables
        .query(

          `SELECT cats.category_id, cats.parent_category_id, cats.name, cats.childseries, 
            cats.dataset_name, cats.parent_name, cats.ancestor_names, 
            ARRAY_AGG (DISTINCT series.name) childnames,
            ARRAY_AGG(DISTINCT series.f) freq, ARRAY_AGG(DISTINCT series.geography) geo, 
            
            CASE WHEN category_leaf_lookup.ancestors IS NOT NULL THEN TRUE
                WHEN category_leaf_lookup.ancestors IS NULL THEN FALSE
                END has_children FROM categories AS cats
           INNER JOIN frequency_filter AS freq
           ON freq.category_id = cats.category_id
           INNER JOIN geography_filter AS geo
           ON geo.category_id = cats.category_id
           LEFT JOIN series_cat
           ON cats.category_id = series_cat.category_id
           LEFT JOIN series 
           ON series_cat.series_id = series.series_id
           LEFT JOIN category_leaf_lookup
           ON cats.category_id = category_leaf_lookup.ancestors
           WHERE (($1 = 'All') OR cats.dataset_name = $1)
           AND (($2 = 0) OR cats.search_vec @@ phraseto_tsquery($3))
           AND cats.parent_category_id = $4
           AND (series.series_id IS NULL OR series.f = $5)
           AND (series.series_id IS NULL OR series.geography = $6)
           AND freq.f = $5
           AND geo.geography = $6
           AND cats.excluded = 0
           AND (($7 = 'All') OR cats.dataset_name = any($8::TEXT[]))
           GROUP BY cats.category_id, category_leaf_lookup.ancestors


           UNION

           SELECT cats.category_id, cats.parent_category_id, cats.name, cats.childseries, 
            cats.dataset_name, cats.parent_name, cats.ancestor_names, '{}' childnames, 
            ARRAY_AGG(DISTINCT series.f) freq, ARRAY_AGG(DISTINCT series.geography) geo,
             
            CASE WHEN  category_leaf_lookup.ancestors IS NOT NULL THEN TRUE
                WHEN category_leaf_lookup.ancestors IS NULL THEN FALSE
                END has_children 
            FROM categories AS cats
           INNER JOIN frequency_filter AS freq
           ON freq.category_id = cats.category_id
           INNER JOIN geography_filter AS geo
           ON geo.category_id = cats.category_id
           LEFT JOIN series_cat
           ON cats.category_id = series_cat.category_id
           LEFT JOIN series 
           ON series_cat.series_id = series.series_id
           LEFT JOIN category_leaf_lookup
           ON cats.category_id = category_leaf_lookup.ancestors
           WHERE (($1 = 'All') OR cats.dataset_name = $1)
           AND (($2 = 0) OR cats.search_vec @@ phraseto_tsquery($3))
           AND cats.parent_category_id = $4
           AND (series.series_id IS NOT NULL )
           AND (series.series_id IS NOT NULL )
           AND freq.f = $5
           AND geo.geography = $6
           AND cats.excluded = 0
           AND (($7 = 'All') OR cats.dataset_name = any($8::TEXT[]))
           GROUP BY cats.category_id, category_leaf_lookup.ancestors
           
            HAVING 

          NOT (COALESCE($5 = any(ARRAY_AGG(DISTINCT series.f)), FALSE)
          AND
          COALESCE($6 = any(ARRAY_AGG(DISTINCT series.geography)), FALSE))`
          //  HAVING 

          //NOT ($5 = any(COALESCE(ARRAY_AGG(DISTINCT series.f), array[]::TEXT[]))
          //AND
          //($6 = all(COALESCE(ARRAY_AGG(DISTINCT series.geography), array[]::TEXT[])))

          // CASE WHEN ($5 = any(COALESCE(ARRAY_AGG(DISTINCT series.f), array[]::TEXT[])) AND ($6 = all(COALESCE(ARRAY_AGG(DISTINCT series.geography), array[]::TEXT[]))) THEN TRUE
          //              ELSE FALSE
          //              END having_test,

          //   `SELECT * FROM categories AS cats
          //  INNER JOIN frequency_filter AS freq
          //  ON freq.category_id = cats.category_id
          //  INNER JOIN geography_filter AS geo
          //  ON geo.category_id = cats.category_id
          //  WHERE (($1 = 'All') OR cats.dataset_name = $1)
          //  AND (($2 = 0) OR cats.search_vec @@ phraseto_tsquery($3))
          //  AND cats.parent_category_id = $4
          //  AND freq.f = $5
          //  AND geo.geography = $6
          //  AND cats.excluded = 0
          //  ORDER BY cats.category_id
          //  LIMIT $7
          //  OFFSET $8`
          ,
          [paginationDto.DataSet, searchTerm.length, searchTerm, parent_category_id,
          paginationDto.Frequency, paginationDto.Region,
          paginationDto.HistorProj, hist_or_proj_names,
          ])
      // Card fetching
    } else if (paginationDto.treeNode) {
      categories = await this.categoryRepository
        .query(
          `SELECT DISTINCT cats.category_id, cats.parent_category_id, cats.name, cats.childseries, 
          cats.dataset_name, cats.parent_name, cats.ancestor_names, cats.ancestors FROM categories AS cats
         INNER JOIN frequency_filter AS freq
         ON freq.category_id = cats.category_id
         INNER JOIN geography_filter AS geo
         ON geo.category_id = cats.category_id
         INNER JOIN category_leaf_lookup as leaf
         ON leaf.leaf_category = cats.category_id
         WHERE (($1 = 'All') OR cats.dataset_name = $1)
         AND (($2 = 0) OR cats.search_vec @@ phraseto_tsquery($3)) 
         AND freq.f = $4
         AND geo.geography = $5
         AND cats.excluded = 0
         AND leaf.ancestors = $6
         AND (($9 = 'All') OR cats.dataset_name = any($10::TEXT[]))
         ORDER BY cats.category_id
         LIMIT $7
         OFFSET $8`
          ,
          [paginationDto.DataSet, searchTerm.length, searchTerm,
          paginationDto.Frequency, paginationDto.Region, paginationDto.treeNode, paginationDto.limit, skippedItems,
          paginationDto.HistorProj, hist_or_proj_names
          ])



      count = await this.categoryRepository
        .query(
          `SELECT COUNT(cats.category_id) FROM categories AS cats
         INNER JOIN frequency_filter AS freq
         ON freq.category_id = cats.category_id
         INNER JOIN geography_filter AS geo
         ON geo.category_id = cats.category_id
         INNER JOIN category_leaf_lookup as leaf
         ON leaf.leaf_category = cats.category_id
         WHERE (($1 = 'All') OR cats.dataset_name = $1)
         AND (($2 = 0) OR cats.search_vec @@ phraseto_tsquery($3)) 
         AND freq.f = $4
         AND geo.geography = $5
         AND cats.excluded = 0
         AND leaf.ancestors = $6
         AND (($7 = 'All') OR cats.dataset_name = any($8::TEXT[]))`
          ,
          [paginationDto.DataSet, searchTerm.length, searchTerm,
          paginationDto.Frequency, paginationDto.Region, paginationDto.treeNode,
          paginationDto.HistorProj, hist_or_proj_names
          ])

      //   `SELECT count_estimate(
      // $$ 
      // SELECT DISTINCT cats.category_id, cats.parent_category_id, cats.name, cats.childseries, 
      // cats.dataset_name, cats.parent_name, cats.ancestor_names, cats.ancestors FROM categories AS cats
      //  INNER JOIN frequency_filter AS freq
      //  ON freq.category_id = cats.category_id
      //  INNER JOIN geography_filter AS geo
      //  ON geo.category_id = cats.category_id
      //  INNER JOIN category_leaf_lookup as leaf
      //  ON leaf.leaf_category = cats.category_id
      //  WHERE (('${paginationDto.DataSet}' = 'All') OR cats.dataset_name = '${paginationDto.DataSet}')
      //  AND ((${searchTerm.length} = 0) OR cats.search_vec @@ phraseto_tsquery('${searchTerm}'))
      //  AND freq.f = '${paginationDto.Frequency}'
      //  AND geo.geography = '${paginationDto.Region}'
      //  AND cats.excluded = 0
      //  AND leaf.ancestors = ${paginationDto.treeNode} 
      //  $$
      //  )`

    }

    // .query(
    //   `SELECT * FROM categories AS cats
    //   INNER JOIN frequency_filter AS freq
    //   ON freq.category_id = cats.category_id
    //   INNER JOIN geography_filter AS geo
    //   ON geo.category_id = cats.category_id
    //   WHERE (($1 = 'All') OR categories.dataset_name = $1)
    //   AND (($2 > 0) OR categories.search_vec @@ phraseto_tsquery($3)
    //   AND categories.parent_category_id = :parent_category_id
    //   AND freq.f = $4
    //   AND geo.geography = $5
    //  AND categories.category_id NOT IN (...$6)
    //   ORDER BY categories.category_id
    //   LIMIT $7
    //   OFFSET $8`
    //   , [paginationDto.DataSet, searchTerm.length, searchTerm,
    //   paginationDto.Frequency, paginationDto.Region, excluded_list,
    //   paginationDto.limit, skippedItems]
    // )
    //console.log(categories)
    // let categories = await this.categoryRepository
    //   //
    //   .createQueryBuilder('categories')
    //   .innerJoin('frequency_filter', 'freq', 'freq.category_id = categories.category_id')
    //   .where(paginationDto.DataSet = 'All' ? '1=1' :
    //     'categories.dataset_name = :dataset_name', {
    //     dataset_name: paginationDto.DataSet,
    //   })

    //   .andWhere(
    //     searchTerm.length > 0
    //       // can I get rid of search_vec and to 'to_tsvector'? maybe not, since I 
    //       // concatenated multiple colums
    //       ? 'categories.search_vec @@ phraseto_tsquery(:term)'
    //       : '1=1',
    //     {
    //       term: searchTerm,
    //     }
    //   )

    //   // then put in region and subregion filters

    //   // need to check units--maybe not matching with data in column

    //   // this reduces to 1=1 if there is not paginationDto.parent_category_id (no parent category
    //   // id means we are doing keyword search, not set tree structure). if there is 
    //   // a parent_category id but it is null then we use 371 (coalesce function)
    //   // -- parent category id set to be 371 if paginationDto.parent category id does
    //   // not exist. don't check plain parent category id to see if this is keyword search
    //   .andWhere(
    //     paginationDto.parent_category_id
    //       ? 'categories.parent_category_id = :parent_category_id'
    //       : '1=1',
    //     {
    //       id: 371,
    //       parent_category_id: parent_category_id,
    //     }
    //   )
    //   .andWhere(
    //     paginationDto.parent_category_id
    //       //&& paginationDto.parent_category_id != 371
    //       ? 'categories.category_id IN (SELECT category_id from frequency_filter where frequency_filter.f = :frequency)'
    //       //? 'freq.f = :frequency'
    //       //':frequency IN (SELECT f from temp_cats where :parent_category_id = any(temp_cats.ancestors))' 
    //       : '1=1',
    //     {
    //       frequency: paginationDto.Frequency,
    //       parent_category_id: parent_category_id
    //     }
    //   )
    //   .andWhere(
    //     paginationDto.parent_category_id
    //       //&& paginationDto.parent_category_id != 371
    //       ? 'categories.category_id IN (SELECT category_id from geography_filter where geography_filter.geography = :geography)'
    //       //':geography IN (SELECT geography from temp_cats where :parent_category_id = any(temp_cats.ancestors))' : 
    //       // category_id IN (select ancestor from temp_cats where :geography = geography)
    //       //`category_id = any((Select ancestors from temp_cats where :geograpy = geography))` :
    //       : '1=1',
    //     {
    //       geography: paginationDto.Region,
    //       parent_category_id: parent_category_id
    //     }
    //   )
    //   .andWhere(
    //     paginationDto.parent_category_id
    //       ? 'categories.category_id NOT IN (:...excluded_list)'
    //       : '1=1',
    //     { excluded_list: excluded_list }
    //   )

    //   // this runs if we have prefilled the descendants array, based on seleted treenode
    //   // This is a keyword search
    //   .andWhere(
    //     paginationDto.treeNode ?
    //       'categories.category_id IN (SELECT leaf_category from category_leaf_lookup WHERE category_leaf_lookup.ancestors = :treeNode)'
    //       // 'categories.category_id IN (:...descendants)' : 
    //       : '1=1',

    //     { treeNode: paginationDto.treeNode }
    //   )
    //   //these are slow 
    //   .andWhere(
    //     paginationDto.treeNode ?
    //       'category_id IN (SELECT category_id from frequency_filter where f = :freq)'
    //       //':freq IN (SELECT f from frequency_filter where frequency_filter.category_id = :selected_treeNode)'
    //       // ':freq IN (SELECT f from temp_cats where temp_cats.category_id IN (:...descendants))'
    //       : '1=1',
    //     {
    //       freq: paginationDto.Frequency,
    //       selected_treeNode: Number(paginationDto.treeNode)
    //     })
    //   .andWhere(
    //     paginationDto.treeNode ?
    //       'category_id IN (SELECT category_id from geography_filter where geography = :geo)'
    //       //':geo IN (SELECT geography from geography_filter where geography_filter.category_id = :selected_treeNode)'
    //       //':geo IN (SELECT geography from temp_cats where temp_cats.category_id IN (:...descendants))'
    //       : '1=1',
    //     {
    //       geo: paginationDto.Region,
    //       selected_treeNode: Number(paginationDto.treeNode)
    //     })
    //   // .andWhere(
    //   //   paginationDto.treeNode ?
    //   //     'category_id not in (SELECT leaf_category FROM category_leaf_lookup WHERE ancestors IN (:...excluded_list))'
    //   //     : '1=1',
    //   //   { excluded_list: excluded_list }
    //   // )




    //   //.andWhere(qb => {
    //   //const subQuery = qb.subQuery().select("temp_cats.geography").from(TempCats, "temp_cats")
    //   //.where("temp_cats.g")
    //   //}:geograpy in (select geography from temp_cats 
    //   //where category_id = paginationDto.category_id))


    //   //.andWhere(:frequency in (select f from temp cats 
    //   // where category ))

    //   //or use CTE? (put index on temp_cats category_id)
    //   //.andWhere(:frequency in CTE.f and :region in CTE.geograpy) 
    //   //with CTE as (select f, geograpy form temp_cats where category_id = category_id)


    //   //.andWhere('series.geography LIKE :region', { region: region })
    //   // must make catname column (join with categories . . . ).andWhere("series.catname LIKE :catname"), {catname: dataset})
    //   // make this too .andWhere("series.histProj LIKE :histProj", {histProj: histProj})
    //   // how to make this? .andWhere("series.SuppDemand LIKE suppDemand")
    //   //.andWhere("series.LastUpdate LIKE :lastUpdate", {lastUpdate: lastUpdate})
    //   .orderBy('category_id')
    //   .skip(skippedItems)
    //   .take(paginationDto.limit)

    //   // see if count is slowing down
    //   .getManyAndCount();
    console.log(count ? count[0] : 'count is undefined')
    return {
      totalCount: count ? count[0].count : count,
      page: paginationDto.page,
      limit: paginationDto.limit,
      categories: categories,
    };
  };

  getCategorybyID = async (category_id: number): Promise<CategorySO> => {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.category_id = :category_id', { category_id: category_id })
      .getOne();

    return categories;
  };

  getParentCats = async (
    category_id: number
  ): Promise<PaginatedCategoryResultDto> => {
    //
    const currentCat = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.category_id = :category_id', { category_id: category_id })
      .getOne();
    return currentCat

    // let ancestors;
    // try {
    //   ancestors = await this.categoryRepository.query(
    //     `WITH RECURSIVE tree (category_id, ancestors, depth, cycle) AS (
    //         SELECT category_id, '{}'::integer[], 0, FALSE
    //         FROM categories WHERE parent_category_id IS NULL
    //       UNION ALL
    //         SELECT
    //           n.category_id, t.ancestors || n.parent_category_id, t.depth + 1,
    //           n.parent_category_id = ANY(t.ancestors)
    //         FROM categories n, tree t
    //         WHERE n.parent_category_id = t.category_id
    //         AND NOT t.cycle
    //     ) SELECT ancestors FROM categories n INNER JOIN tree USING (category_id)
    //     WHERE $1 = category_id`,
    //     [currentCat.category_id]
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(ancestors[0].ancestors);
    // return ancestors;
  };

  getCountryMenuOptions = async (dataset_id: any, hist_or_proj: string): Promise<Array<string>> => {
    let hist_or_proj_names;
    if (hist_or_proj === 'Historical') {
      hist_or_proj_names = ['Coal', 'Electricity', 'International Energy Data',
        'Natural Gas', 'Petroleum', 'State Energy Data System (SEDS)', 'Crude Oil Imports'];
    } else if (hist_or_proj === 'Projection') {
      hist_or_proj_names = ['Annual Energy Outlook 2014', 'Annual Energy Outlook 2015',
        'Annual Energy Outlook 2016', 'Annual Energy Outlook 2017', 'Annual Energy Outlook 2018',
        'Annual Energy Outlook 2019', 'Annual Energy Outlook 2020', 'Annual Energy Outlook 2021',
        'Short-Term Energy Outlook', 'International Energy Outlook'];
    }
    let country_matches
    if (dataset_id.dataset_id === 'All') {

      country_matches = this.categoryRepository.query(
        'SELECT DISTINCT(geography) FROM geography_filter WHERE geography = any ($1)', [menu_options_logical]);
    } else {
      country_matches = this.categoryRepository.query(
        'SELECT DISTINCT(geography) FROM geography_filter WHERE geography = any ($1) AND category_id = $2', [menu_options_logical, dataset_id.dataset_id]);
    }

    // if (dataset_id !== ) {
    //   country_matches = this.categoryRepository.query(
    // `SELECT DISTINCT(geography) FROM geography_filter WHERE category_id = $1`, [dataset_id]);
    return country_matches
  }
}

