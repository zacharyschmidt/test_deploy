import { CSSProperties } from 'react';

//this might be a problem
import { RouteComponentProps } from "@reach/router";


export type UserCreds = {
  email: string;
  password: string;
};

export type Todo = {
  content: string;
  createdOn: Date;
  completed: boolean;
  id: string;
};

export type TodosTableHeader = {
  id: string;
  label: string;
  minWidth: number;
};

export type CurrentUser = {
  id: string;
  createdOn: Date;
  email: string;
  token?: string;
};

export type AlertType = 'success' | 'info' | 'warning' | 'error' | undefined;

export type SnackBarAlert = {
  type: AlertType;
  msg: string;
};

export type HeaderStyle = CSSProperties;
export type RowStyle = CSSProperties;

export type Action = {
  type: string;
  payload: any;
};

export interface ITodoState {
  todos: Todo[];
  isLoading: boolean;
  err: any;
}

export interface IStore {
  todo: ITodoState;
  ui: IUIEIA;
  auth: IAuth;
  eia: IEIA; 
}

export interface IEIA {
series: Array<ISeries>;
  selected: Array<ISeries>;
  seriesData: Array<ISeriesData>;
  treeSeries: Array<ISeries>;
  filters: any
}

export type Dispatch = React.Dispatch<IAction>;


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

export interface IUIEIA {
  snackbar: SnackBarAlert;
}

export interface IAuth {
  isFakeData: boolean;
  currentUser: CurrentUser | null;
  err: any;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export interface ITodoTable {
  data: Todo[];
  header: TodosTableHeader[];
  stickyHeader: boolean;
  placeHolder?: string;
  headerStyle?: HeaderStyle;
  rowStyle?: RowStyle;
  isLoading: boolean;
  onCompleteTodo: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    id: string
  ) => void;
  onDeleteTodo: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
}
