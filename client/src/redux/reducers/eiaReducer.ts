import { IEIA, IAction } from '../../types';

const initialState: IEIA = {
  searchTerm: '',
  series: [],
  seriesCount: 0,
  selected: [],
  seriesData: [],
  treeSeries: [],
  page: 1,
  limit: 50,
  filters: {
    Region: 'All',
    SubRegion: 'None',
    Frequency: 'All',
    Units: 'All',
    DataSet: 'All',
    HistorProj: 'All',
    SuppDemand: 'All',
    LastUpdate: 'All',
    
  }
};

export const eiaReducer = (state=initialState, action: IAction): IEIA => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'FETCH_DATA':
      return { ...state, series: action.payload.series, seriesCount: action.payload.count };
    case 'CLEAR_SERIES':
      return { ...state, series: [] };
    case 'ADD_SEL':
      return { ...state, selected: [...state.selected, action.payload] };
    case 'REMOVE_SEL':
      return { ...state, selected: action.payload };
    case 'FETCH_DATA_SERIES':
      return { ...state, seriesData: [...state.seriesData, action.payload] };
    case 'SET_TREE_SERIES':
      return { ...state, treeSeries: [action.payload] };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'RESET_PAGE':
      return { ...state}
    case 'SET_LIMIT':
      return { ...state, limit: action.payload}
    case 'SET_FILTER':
      const filterObj =
        action.payload.filter === 'Forecast/Historical'
          ? { ...state.filters, histOrProj: action.payload.option }
          : {
              ...state.filters,
              [action.payload.filter]: action.payload.option
            };
      console.log(filterObj);
      return { ...state, filters: filterObj };
    default:
      return state;
  }
};