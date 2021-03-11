import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategorySO } from './dto/category.dto';
import { UserEntity } from 'src/user/user.entity';

import { PaginationDto } from './dto/Pagination.dto';
import { PaginatedCategoryResultDto } from './dto/PaginatedCategoryResult.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    
  ) {}

  //   private responseOject = (series: SeriesEntity): SeriesSO => {
  //     return {
  //       ...series,

  //     };
  //   };

  getSearchedCategories = async (
    paginationDto: PaginationDto
  ): Promise<PaginatedCategoryResultDto> => {

 
    console.log('PAGINATION DTO IN GET SEARCHED CATEGORIES ACTION')
    console.log('DOES IT HAVE A PARENT CATGEGORY ID?')
    console.log(paginationDto)
    if (paginationDto.treeNode) {
     try {
       console.log('SEARCHING CATEGORIES TO GET DESCENDANTS')
       console.log('Treenode = 371?')
       console.log(Number(paginationDto.treeNode) === 371)
      
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
    console.log(paginationDto.treeNode)
    
    //console.log(descendants)
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    console.log('TEST');
  

    let dataset_name;
    console.log('DATASET')
    console.log(paginationDto.DataSet)
    switch (paginationDto.DataSet) {
      case 'All':
        dataset_name = '%';
        break;
      default:
        dataset_name = paginationDto.DataSet;
    }
    let region = 'USA';
    let searchTerm = '';
    if (paginationDto.searchTerm) {
      searchTerm = paginationDto.searchTerm
    }
    console.log('the data is: ' + paginationDto.DataSet);
    let parent_category_id;
    if (paginationDto.parent_category_id) {
      parent_category_id = Number(paginationDto.parent_category_id);
    } else {
      parent_category_id = 371;
    }
    // const totalCount = await this.seriesRepository.count()
    const totalCount = 1000;
    // const tempCats = await this.tempCatsRepository
    //   .createQueryBuilder('temp_cats')
    //   .select('temp_cats.geography')
    //   .where('temp_cats.category_id = :category_id', {category_id: })
    //   .where
    let categories = await this.categoryRepository
      .createQueryBuilder('categories')
      .where('categories.dataset_name LIKE :dataset_name', {
        dataset_name: dataset_name,
      })

      .andWhere(
        searchTerm.length > 0
          ? 'categories.search_vec @@ phraseto_tsquery(:term)'
          : '1=1',
        {
          term: searchTerm,
        }
      )

      // then put in region and subregion filters

      // need to check units--maybe not matching with data in column

      // this reduces to 1=1 if there is not paginationDto.parent_category_id (no parent category
      // id means we are doing keyword search, not set tree structure). if there is 
      // a parent_category id but it is null then we use 371 (coalesce function)
      // -- parent category id set to be 371 if paginationDto.parent category id does
      // not exist. don't check plain parent category id to see if this is keyword search
      .andWhere(
        paginationDto.parent_category_id
          ? 'COALESCE(categories.parent_category_id, :id) = :parent_category_id'
          : '1=1',
        {
          id: 371,
          parent_category_id: parent_category_id,
        }
      )
      .andWhere(
       paginationDto.parent_category_id 
       //&& paginationDto.parent_category_id != 371
        ? 'categories.category_id IN (SELECT category_id from frequency_filter where frequency_filter.f = :frequency)' 
        //':frequency IN (SELECT f from temp_cats where :parent_category_id = any(temp_cats.ancestors))' 
        : '1=1',
        {
         frequency: paginationDto.Frequency,
         parent_category_id: parent_category_id}
      )
      .andWhere(
       paginationDto.parent_category_id 
       //&& paginationDto.parent_category_id != 371
        ? 'categories.category_id IN (SELECT category_id from geography_filter where geography_filter.geography = :geography)'
        //':geography IN (SELECT geography from temp_cats where :parent_category_id = any(temp_cats.ancestors))' : 
        // category_id IN (select ancestor from temp_cats where :geography = geography)
        //`category_id = any((Select ancestors from temp_cats where :geograpy = geography))` :
        : '1=1',
        {geography: paginationDto.Region,
         parent_category_id: parent_category_id}
      )
      // this runs if we have prefilled the descendants array, based on seleted treenode
      // This is a keyword search
      .andWhere(
       paginationDto.treeNode ?
       'categories.category_id IN (SELECT leaf_category from category_leaf_lookup WHERE category_leaf_lookup.ancestors = :treeNode)' 
        // 'categories.category_id IN (:...descendants)' : 
        : '1=1',
         
        {treeNode: paginationDto.treeNode}
      )
     //these are slow 
      .andWhere(
        paginationDto.treeNode ? 
        ':freq IN (SELECT f from frequency_filter where frequency_filter.category_id = :selected_treeNode)'
        // ':freq IN (SELECT f from temp_cats where temp_cats.category_id IN (:...descendants))'
        : '1=1',
      {freq: paginationDto.Frequency,
       selected_treeNode: Number(paginationDto.treeNode)})
       .andWhere(
        paginationDto.treeNode ? 
        ':geo IN (SELECT geography from geography_filter where geography_filter.category_id = :selected_treeNode)'
        //':geo IN (SELECT geography from temp_cats where temp_cats.category_id IN (:...descendants))'
        : '1=1',
      {geo: paginationDto.Region,
       selected_treeNode: Number(paginationDto.treeNode)})




      //.andWhere(qb => {
        //const subQuery = qb.subQuery().select("temp_cats.geography").from(TempCats, "temp_cats")
        //.where("temp_cats.g")
      //}:geograpy in (select geography from temp_cats 
              //where category_id = paginationDto.category_id))


      //.andWhere(:frequency in (select f from temp cats 
          // where category ))

          //or use CTE? (put index on temp_cats category_id)
      //.andWhere(:frequency in CTE.f and :region in CTE.geograpy) 
      //with CTE as (select f, geograpy form temp_cats where category_id = category_id)


      //.andWhere('series.geography LIKE :region', { region: region })
      // must make catname column (join with categories . . . ).andWhere("series.catname LIKE :catname"), {catname: dataset})
      // make this too .andWhere("series.histProj LIKE :histProj", {histProj: histProj})
      // how to make this? .andWhere("series.SuppDemand LIKE suppDemand")
      //.andWhere("series.LastUpdate LIKE :lastUpdate", {lastUpdate: lastUpdate})

      .skip(skippedItems)
      .take(paginationDto.limit)
      .getMany();
    //console.log(categories[1])
    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      categories: categories,
    };
  };

  getCategorybyID = async (categoryID: number): Promise<CategorySO> => {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.category_id = :categoryID', { categoryID: categoryID })
      .getOne();

    return categories;
  };

  getParentCats = async (
    categoryID: number
  ): Promise<PaginatedCategoryResultDto> => {
    //
    console.log(categoryID);
    const currentCat = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.category_id = :categoryID', { categoryID: categoryID })
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
}
