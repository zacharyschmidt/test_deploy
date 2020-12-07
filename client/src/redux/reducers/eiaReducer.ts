import { IEIA, IAction } from '../../types';

const initialState: IEIA = {
  series: [],
  selected: [],
  seriesData: [],
  treeSeries: [],
  filters: {
    Region: 'All',
    SubRegion: 'None',
    Frequency: 'All',
    DataSet: 'All',
    Units: 'All'
  }
};

export const eiaReducer = (state=initialState, action: IAction): IEIA => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, series: action.payload };
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