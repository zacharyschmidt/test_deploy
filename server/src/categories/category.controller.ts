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

import { CategoryService } from './category.service';
import { PaginationDto } from './dto/Pagination.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }
  @Get('cards')
  getTreeStructure(@Query() paginationDto: PaginationDto) {

  }

  @Get('treeAndCards')
  getTreeAndCards(@Query() paginationDto: PaginationDto) {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    let result =
      this.categoryService.getTreeAndCards({
        ...paginationDto,
        //limit: paginationDto.limit > 10 ? 10 : paginationDto.limit
      })
 
    return result;
  }

  @Get('rowCards')
  getRowCards(@Query() paginationDto: PaginationDto) {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    let result =
      this.categoryService.getCardCategories(paginationDto,
      )
    return result;
  }



  @Get('category')
  getCategorybyID(@Query('category_ID') category_ID: number) {
    return this.categoryService.getCategorybyID(category_ID);
  }

  //get ancestor category names

  @Get('menu')
  getCountryMenuOptions(@Query() dataset_id: number | string, @Query() hist_or_proj: string) {
    return this.categoryService.getCountryMenuOptions(dataset_id, hist_or_proj)
  }

  @Get('parents')
  getParentCats(@Query('category_id') category_ID: number) {
    return this.categoryService.getParentCats(category_ID);
  }
}
