import { CategorySO } from './category.dto';

export class PaginatedCategoryResultDto {
  categories: CategorySO[];
  // ancestors?: number[];
  // ancestor_names?: string[];
  page?: number;
  limit?: number;
  totalCount?: number;
}
