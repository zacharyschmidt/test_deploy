export class PaginationDto {
  page: number;

  limit: number;
  parent_category_id: number;
  searchTerm: string;
  treeNode: number|null;
  Region: string;
  SubRegion: string;
  Frequency: string;
  Units: string;
  DataSet: string;
  HistorProj: string;
  SuppDemand: string;
  LastUpdate: string;
}
