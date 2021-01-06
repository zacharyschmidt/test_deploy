import { SeriesSO } from "./series.dto";

export class PaginatedSeriesResultDto {
    series: SeriesSO[]
    page: number
    limit: number
    totalCount: number
}