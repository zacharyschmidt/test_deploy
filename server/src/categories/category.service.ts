import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, SimpleConsoleLogger } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { FrequencyFilterEntity } from './category.entity';
import { CategorySO } from './dto/category.dto';
import { UserEntity } from 'src/user/user.entity';

import { PaginationDto } from './dto/Pagination.dto';
import { PaginatedCategoryResultDto } from './dto/PaginatedCategoryResult.dto';

import menu_options_logical from './constants/menuOptionsLogical'
import { count } from 'rxjs/operators';

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

  // needs to take a parent_cat_id and filters and return an array of categories
  getTreeAndCards = async (
    paginationDto: PaginationDto
    // key must be a string. I want to use parent_category_id, will number
    // be coerced to string automatically?
    // does it get passed as a string by the controller?
    // below I coerce it to a number. investigate this . . .
  ): Promise<[Array<CategorySO>, { [key: string]: PaginatedCategoryResultDto }]> => {
    console.log('getTreeAndCards')
    console.log(paginationDto)
    // Send in optional parameter, row_ids (should send names too, or put them in the 
    // store to get them later. ). this parameter will be sent when item (but not leaf)
    // is clicked. row ids can be fetched from the store. when row_ids is sent,
    // don't run getTreeCategories, just use the row_ids to iterate and fetch rowCategories
    // change the for of so that is has an arrayof ids, not cats to iterate over (no cat.id, just id)
    // means I will have to map the treeCats array to an id array in the case of leaf click
    // when we will run the get treeCategories
    let treeCats = await this.getTreeCategories(paginationDto);

    let rows = []
    // don't get rows for top level
    if (paginationDto.parent_category_id != 371) {
    for (let cat of treeCats) {
      let row = { name: '', categories: [] };
      //await this.getCardCategories({ ...paginationDto, parent_category_id: cat.category_id })
      
      row.name = cat.name;
      rows = rows.concat([row])
    }
  }

    let rowDict: { [key: string]: PaginatedCategoryResultDto } = {};

    treeCats.forEach((cat, index) => {
      if (cat.has_children) {

        rowDict[cat.category_id.toString()] = rows[index]

      }
    })

    return [treeCats, rowDict];

  }


  getTreeCategories = async (
    paginationDto: PaginationDto): Promise<Array<CategorySO>> => {
    let region = 'USA';
    let searchTerm = '';
    // we don't need to use the search term when we build the tree
    // if (paginationDto.searchTerm) {
    //   searchTerm = paginationDto.searchTerm
    // }
    let parent_category_id;
    if (paginationDto.parent_category_id) {
      parent_category_id = Number(paginationDto.parent_category_id);
    } else {
      parent_category_id = 371;
    }
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
    console.log('REGION')
    console.log(paginationDto.Region)

    let categories;

    // case where geography filter is not all. we need 
    // a second case for 'All' where we do not join on the geography 
    // filter table so that we capture categories that hold childseries
    // with null geography data
    if (paginationDto.Region != 'All') {
      categories = await this.categoryRepository

        // right now the inner joins with the filter tables exclude any of the 
        // 13000 categories that are missing from at least one of the filter tables

        // second query grabs hybrid nodes that hold childseries that do not match filters.
        // we need to keep these nodes so we can access their childcategories,
        // even if we don't want their child series


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
         ON cats.category_id = geo.category_id 
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
         AND (series.series_id IS NULL OR (series.geography = $6))
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

          ,
          [paginationDto.DataSet, searchTerm.length, searchTerm, parent_category_id,
          paginationDto.Frequency, paginationDto.Region,
          paginationDto.HistorProj, hist_or_proj_names,
          ])
    } else if (paginationDto.Region === 'All') {
      // same query but do not join on geography_filter table

      categories = await this.categoryRepository.query(

        `SELECT cats.category_id, cats.parent_category_id, cats.name, cats.childseries, 
          cats.dataset_name, cats.parent_name, cats.ancestor_names, 
          ARRAY_AGG (DISTINCT series.name) childnames,
          ARRAY_AGG(DISTINCT series.f) freq, ARRAY_AGG(DISTINCT series.geography) geo, 
          
          CASE WHEN category_leaf_lookup.ancestors IS NOT NULL THEN TRUE
              WHEN category_leaf_lookup.ancestors IS NULL THEN FALSE
              END has_children FROM categories AS cats
         INNER JOIN frequency_filter AS freq
         ON freq.category_id = cats.category_id
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
         AND freq.f = $5
         AND cats.excluded = 0
         AND (($6 = 'All') OR cats.dataset_name = any($7::TEXT[]))
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
         AND cats.excluded = 0
         AND (($6 = 'All') OR cats.dataset_name = any($7::TEXT[]))
         GROUP BY cats.category_id, category_leaf_lookup.ancestors

          HAVING 

        NOT (COALESCE($5 = any(ARRAY_AGG(DISTINCT series.f)), FALSE))`

        ,
        [paginationDto.DataSet, searchTerm.length, searchTerm, parent_category_id,
        paginationDto.Frequency,
        paginationDto.HistorProj, hist_or_proj_names,
        ])
    }


    return categories
  }


  getCardCategories = async (
    paginationDto: PaginationDto
    // key must be a string. I want to use parent_category_id, will number
    // be coerced to string automatically?
    // does it get passed as a string by the controller?
    // below I coerce it to a number. investigate this . . .
  ): Promise<PaginatedCategoryResultDto> => {




    //console.log(descendants)
    const skippedItems = (paginationDto.page - 1) * 5;


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



    // Card fetching



    let categories;
    let count;
     if (paginationDto.Region != 'All') {
       categories = await this.categoryRepository
      .query(
        `SELECT DISTINCT cats.category_id, cats.parent_category_id, cats.name, cats.childseries, 
          cats.dataset_name, cats.parent_name, cats.ancestor_names, cats.ancestors, 
          CASE WHEN leaf.ancestors IS NOT NULL THEN TRUE
              WHEN leaf.ancestors IS NULL THEN FALSE
              END has_children
            FROM categories AS cats
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
        paginationDto.Frequency, paginationDto.Region, parent_category_id, 5, skippedItems,
        paginationDto.HistorProj, hist_or_proj_names
        ])

        count = await this.categoryRepository
      .query(
        `SELECT COUNT(DISTINCT cats.category_id) FROM categories AS cats
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
        paginationDto.Frequency, paginationDto.Region, parent_category_id,
        paginationDto.HistorProj, hist_or_proj_names
        ])
      } else if (paginationDto.Region === 'All'){
       categories = await this.categoryRepository
      .query(
        `SELECT DISTINCT cats.category_id, cats.parent_category_id, cats.name, cats.childseries, 
          cats.dataset_name, cats.parent_name, cats.ancestor_names, cats.ancestors cats.has_children FROM categories AS cats
         INNER JOIN frequency_filter AS freq
         ON freq.category_id = cats.category_id
         
         INNER JOIN category_leaf_lookup as leaf
         ON leaf.leaf_category = cats.category_id
         WHERE (($1 = 'All') OR cats.dataset_name = $1)
         AND (($2 = 0) OR cats.search_vec @@ phraseto_tsquery($3)) 
         AND freq.f = $4
         AND cats.excluded = 0
         AND leaf.ancestors = $5
         AND (($8 = 'All') OR cats.dataset_name = any($9::TEXT[]))
         ORDER BY cats.category_id
         LIMIT $6
         OFFSET $7`
        ,
        [paginationDto.DataSet, searchTerm.length, searchTerm,
        paginationDto.Frequency, parent_category_id, 5, skippedItems,
        paginationDto.HistorProj, hist_or_proj_names
        ]) 

    count = await this.categoryRepository
      .query(
        `SELECT COUNT(cats.category_id) FROM categories AS cats
         INNER JOIN frequency_filter AS freq
         ON freq.category_id = cats.category_id
        
         INNER JOIN category_leaf_lookup as leaf
         ON leaf.leaf_category = cats.category_id
         WHERE (($1 = 'All') OR cats.dataset_name = $1)
         AND (($2 = 0) OR cats.search_vec @@ phraseto_tsquery($3)) 
         AND freq.f = $4
         
         AND cats.excluded = 0
         AND leaf.ancestors = $5
         AND (($6 = 'All') OR cats.dataset_name = any($7::TEXT[]))`
        ,
        [paginationDto.DataSet, searchTerm.length, searchTerm,
        paginationDto.Frequency, parent_category_id,
        paginationDto.HistorProj, hist_or_proj_names
        ])

      }



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



    console.log("GETTING CARDS")
    console.log("parent_category_id", parent_category_id)
    console.log("count", count[0].count)

    return {
      totalCount: count[0].count,
      page: paginationDto.page,
      categories: categories
    }
  }



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

      country_matches = await this.categoryRepository.query(
        'SELECT DISTINCT(geography) FROM geography_filter WHERE geography = any ($1)', [menu_options_logical]);
    } else {
      country_matches = await this.categoryRepository.query(
        'SELECT DISTINCT(geography) FROM geography_filter WHERE geography = any ($1) AND category_id = $2', [menu_options_logical, dataset_id.dataset_id]);
    }

    // if (dataset_id !== ) {
    //   country_matches = this.categoryRepository.query(
    // `SELECT DISTINCT(geography) FROM geography_filter WHERE category_id = $1`, [dataset_id]);
  country_matches.unshift({ geography: "All" })
    return country_matches
  }
}

