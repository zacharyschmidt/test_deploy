import { CategorySO } from './category.dto';

export class PaginatedCategoryResultDto {
  categories: CategorySO[];
  page?: number;
  limit?: number;
  totalCount?: number;
}
