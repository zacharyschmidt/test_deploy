import { AccessTimeTwoTone } from '@material-ui/icons';
import { IEIA, IAction, ICategories } from '../../types';

const initialState: IEIA = {
  searchTerm: '',
  series: [],
  seriesCount: 0,
  selected: [],
  seriesData: [],
  treeSeries: [],
  treeCategories: [],
  treeNodes: [],
  treeLeaves: [],
  selectedTreeNode: null,
  selectedSearchNode: null,
  treeLoading: false,
  categories: [],
  catSeriesFlag: 'Categories',
  DataSetName: 'All', // should be 'All'?
  CountryMenuDisplay: 'United States', //should be United States?
  HistorProjDisplay: 'All',
  menuTopCats: [],
  menuRegions: [],
  menuHistorProj: [],
  page: 1,
  limit: 50,
  filters: {
    Region: 'USA',
    SubRegion: 'None',
    Frequency: 'A',
    Units: 'All',
    DataSet: ['All', 'All'],
    HistorProj: 'All',
    SuppDemand: 'All',
    LastUpdate: 'All'
  }
};

// `keyof any` is short for "string | number | symbol"
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

export const eiaReducer = (state = initialState, action: IAction): IEIA => {


  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SELECTED_TREENODE':
      return { ...state, selectedTreeNode: action.payload }
    case 'SET_SEARCH_NODE':


      return { ...state, selectedSearchNode: action.payload }

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
      return { ...state, searchTerm: '' };
    case 'ADD_SEL':
      return { ...state, selected: [...state.selected, action.payload] };
    case 'REMOVE_SEL':
      return { ...state, selected: action.payload };
    case 'FETCH_DATA_SERIES':
      return { ...state, seriesData: action.payload };
    case 'FETCH_CATS':
      return { ...state, categories: action.payload.series, seriesCount: action.payload.count };
    case 'SET_TREE_STRUCTURE':
      let node_id: number;
      if (action.payload.node_id == null) {
        node_id = 0;
      } else {
        node_id = action.payload.node_id;
      }
      // const treeData = action.payload.tree_leaves.map((cat: any) => {
      //   return {
      //     id: Number(cat.category_id),
      //     label: cat.name
      //   };
      // });
      const treeData = action.payload.tree_leaves.map((leaf: any) => {
        return {
          category_id: leaf.category_id,
          name: leaf.name,
          childCategories: [],
          childseries: leaf.childseries,
          childnames: leaf.childnames,
          has_children: leaf.has_children,
        };
      });

      let newTree = state.treeCategories;
      if (newTree.length === 0 || node_id == 371) {
        // if the tree has no nodes, make the recently returned
        // leaf nodes into the first level
        newTree = treeData;
      } else {
        const testNode = (cat: ICategories) => {
          if (cat.category_id == node_id) {
            cat.childCategories = treeData;
            return cat;
          }
          if (cat.childCategories.length > 0) {
            cat.childCategories.map((cat: ICategories) => {
              testNode(cat);
            });
          }
          return cat;
        };
        newTree = newTree.map((cat) => {
          // need to do this recursively

          return testNode(cat);
        });
      }
      // if (hasKey(newTree, node_id)) {
      //   newTree[node_id] = treeData;
      // }

      return {
        ...state,
        treeCategories: newTree,
        treeNodes: state.treeNodes.concat([Number(node_id)]),
        // problem here--treeLeaves is getting overwritten to an empty array when
        // i navigate down to a category with series as leaves. Or is the problem that
        // treeseries are empty . . .
        treeLeaves:
          action.payload.tree_leaves.length > 0
            ? action.payload.tree_leaves
            : state.treeLeaves
        // action.payload.tree_leaves > 0
        //   ? action.payload.tree_leaves
        //   : state.treeLeaves
      };
    case 'SET_TREE_SERIES':
      return { ...state, treeSeries: action.payload };
    case 'GET_PARENT_CATS':
      return { ...state };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'RESET_PAGE':
      return { ...state };
    case 'SET_LIMIT':
      return { ...state, limit: action.payload };
    case 'SET_MENU_TOPCATS':
      return { ...state, menuTopCats: action.payload.options_array }
    case 'SET_MENU_REGIONS':
      return { ...state, menuRegions: action.payload.options_array }
    case 'SET_MENU_HIST_OR_PROJ':
      return { ...state, menuHistorProj: action.payload.options_array }
    case 'SET_MENU_SELECTION':
      return { ...state, [action.payload.store_mem]: action.payload.selection }
    case 'SET_FILTER':
      const filterObj =
        action.payload.filter === 'Forecast/Historical'
          ? { ...state.filters, histOrProj: action.payload.option }
          : {
            ...state.filters,
            [action.payload.filter]: action.payload.option
          };
      return { ...state, filters: filterObj };
    case 'FRESH_START':
      return { ...state, selectedTreeNode: null, selectedSearchNode: null, categories: [], DataSetName: 'All', CountryMenuDisplay: 'United States', searchTerm: '', seriesCount: 0, filters: { ...state.filters, Region: 'USA', DataSet: ['All', 'All'] } }
    //{ ...initialState, treeCategories: state.treeCategories } { ...state, selectedTreeNode: null, selectedSearchNode: null, categories: [], DataSetName: 'All', CountryMenuDisplay: 'United States', searchTerm: '', filters: { ...state.filters, Region: 'USA', DataSet: ['All', 'All'] } }
    case 'TREE_LOADING':
      return { ...state, treeLoading: true }
    case 'TREE_FINISHED_LOADING':
      return { ...state, treeLoading: false }
    default:
      return state;
  }
};
