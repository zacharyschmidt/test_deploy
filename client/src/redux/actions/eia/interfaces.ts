import { RouteComponentProps } from "@reach/router";

export type Dispatch = React.Dispatch<IAction>;

export interface IEIA {
  series: Array<ISeries>;
  selected: Array<ISeries>;
  seriesData: Array<ISeriesData>;
  treeSeries: Array<ISeries>;
  filters: any
}

export interface ISeriesData {
  series_id: string;
  name: string;
  units: string;
  f: string;
  description: string;
  copyright: string;
  source: string;
  iso3166: string;
  geography: string;
  start: string;
  end: string;
  updated: string;
  data: [];
}

export interface IAction {
  type: string;
  payload: Array<ISeries> | any;
}

export interface ISeries {
  series_id: number;
  name: string;
}

export interface ISeriesProps {
  series: Array<ISeries>;
  store: { state: IEIA; dispatch: Dispatch };
  toggleSelectAction: (
    state: IEIA,
    dispatch: any,
    series: ISeries
  ) => IAction;
  selected: Array<ISeries>;
}

export interface DatasetDetailsProps extends RouteComponentProps {
  series_id?: string;
}