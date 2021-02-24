import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategorySO } from './dto/category.dto';
import { UserEntity } from 'src/user/user.entity';

import { PaginationDto } from './dto/Pagination.dto';
import { PaginatedCategoryResultDto } from './dto/PaginatedCategoryResult.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  //   private responseOject = (series: SeriesEntity): SeriesSO => {
  //     return {
  //       ...series,

  //     };
  //   };

  getSearchedCategories = async (
    paginationDto: PaginationDto
  ): Promise<PaginatedCategoryResultDto> => {

    let descendants = []
    console.log(paginationDto.treeNode)
    if (paginationDto.treeNode) {
     try {
      descendants = await this.categoryRepository.query(
        `SELECT category_id from categories
        where $1 = any(ancestors)`,
        [paginationDto.treeNode]);
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
    console.log('DESCENDANTS')
    descendants = descendants.map((descendant) => descendant.category_id);
    console.log(descendants)
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    console.log('TEST');
    console.log(paginationDto);

    let dataset_name;
    switch (paginationDto.DataSet) {
      case 'All':
        dataset_name = '%';
        break;
      default:
        dataset_name = paginationDto.DataSet;
    }
    let region = 'USA';
    console.log('the data is: ' + paginationDto.DataSet);
    let parent_category_id;
    if (paginationDto.parent_category_id) {
      parent_category_id = Number(paginationDto.parent_category_id);
    } else {
      parent_category_id = 371;
    }
    // const totalCount = await this.seriesRepository.count()
    const totalCount = 1000;
    let categories = await this.categoryRepository
      .createQueryBuilder('categories')
      .where('categories.dataset_name LIKE :dataset_name', {
        dataset_name: dataset_name,
      })

      .andWhere(
        paginationDto.searchTerm
          ? 'categories.search_vec @@ phraseto_tsquery(:term)'
          : '1=1',
        {
          term: paginationDto.searchTerm,
        }
      )

      // then put in region and subregion filters

      // need to check units--maybe not matching with data in column

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
       descendants.length > 0 ?
        'categories.category_id IN (:...descendants)' : 
        '1=1',
         
        {descendants: descendants}
      )
      //.andWhere('series.geography LIKE :region', { region: region })
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
