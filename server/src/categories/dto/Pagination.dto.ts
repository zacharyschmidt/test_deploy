export class PaginationDto {
  page: number;

  limit: number;
  parent_category_id: number;
  searchTerm: string;
  //maybe it shouldn't be an array, 
  //because the tree nodes don't know thery own childer yet
  Region: string;
  SubRegion: string;
  Frequency: string;
  Units: string;
  DataSet: string;
  HistorProj: string;
  SuppDemand: string;
  LastUpdate: string;
}
