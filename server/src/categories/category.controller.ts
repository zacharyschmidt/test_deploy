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
  constructor(private categoryService: CategoryService) {}

  @Get('search')
  getSearchedCategories(@Query() paginationDto: PaginationDto) {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);
    console.log(paginationDto);
    return this.categoryService.getSearchedCategories({
      ...paginationDto,
      //limit: paginationDto.limit > 10 ? 10 : paginationDto.limit
    });
    
  }

  @Get('category')
  getCategorybyID(@Query('category_ID') category_ID: number) {
    return this.categoryService.getCategorybyID(category_ID);
  }

  @Get('menu')
  getCountryMenuOptions(@Query() dataset_id: number|string) {
    return this.categoryService.getCountryMenuOptions(dataset_id)}
  
  @Get('parents')
  getParentCats(@Query('category_id') category_ID: number) {
    return this.categoryService.getParentCats(category_ID);
  }
}
