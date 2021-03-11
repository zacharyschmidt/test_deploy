import { Module, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity, GeographyFilterEntity, FrequencyFilterEntity,
  LeafCategoryLookupEntity } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity,
    GeographyFilterEntity, FrequencyFilterEntity, LeafCategoryLookupEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
