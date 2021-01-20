import { AccessTimeTwoTone } from '@material-ui/icons';
import { IEIA, IAction } from '../../types';

const initialState: IEIA = {
  searchTerm: '',
  series: [],
  seriesCount: 0,
  selected: [],
  seriesData: [],
  treeSeries: [],
  treeCategories: { 371: [] },
  treeLeaves: [],
  categories: [],
  catSeriesFlag: 'Series',
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
    LastUpdate: 'All'
  }
};

export const eiaReducer = (state = initialState, action: IAction): IEIA => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'TOGGLE_CATSERIES':
      return {
        ...state,
        catSeriesFlag: action.payload
      };
    case 'FETCH_DATA':
      return {
        ...state,
        series: action.payload.series,
        seriesCount: action.payload.count
      };
    case 'CLEAR_SERIES':
      return { ...state, series: [] };
    case 'ADD_SEL':
      return { ...state, selected: [...state.selected, action.payload] };
    case 'REMOVE_SEL':
      return { ...state, selected: action.payload };
    case 'FETCH_DATA_SERIES':
      return { ...state, seriesData: [...state.seriesData, action.payload] };
    case 'FETCH_CATS':
      return { ...state, categories: action.payload.series };
    case 'SET_TREE_STRUCTURE':
      let node_id: any;
      if (action.payload.node_id == null) {
        node_id = 'root';
      } else {
        node_id = action.payload.node_id;
      }
      const treeData = action.payload.tree_leaves.map((cat: any) => {
        return {
          id: String(cat.category_id),
          label: cat.name
        };
      });
      return {
        ...state,
        treeCategories: { ...state.treeCategories, [node_id]: treeData },
        treeLeaves: action.payload.tree_leaves
      };
    case 'SET_TREE_SERIES':
      return { ...state, treeSeries: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'RESET_PAGE':
      return { ...state };
    case 'SET_LIMIT':
      return { ...state, limit: action.payload };
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
