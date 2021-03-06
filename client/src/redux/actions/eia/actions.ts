import axios from 'axios';
import { ContactSupportOutlined, RestorePageRounded } from '@material-ui/icons';
import store from '../../store/store';
import { IAction, ISeries, IEIA, IStore } from '../../../types';
import { responsiveFontSizes } from '@material-ui/core';

//const key = process.env.REACT_APP_EIA_API_KEY;

export const setSelectedTreeNodeAction = (dispatch: any, treeNode: number) => {

  return dispatch({
    type: 'SET_SELECTED_TREENODE',
    payload: treeNode,
  });
}

export const setSearchNodeAction = (dispatch: any, searchNode: number) => {
  return dispatch({
    type: 'SET_SEARCH_NODE',
    payload: searchNode
  })
}
export const getBreadCrumbsAction = async (dispatch: any, category_id: number) => {
  let breadcrumbs;
  // should get names of ancestor categories
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/categories/parents',
      params: {
        category_id: category_id
      }

    });
    breadcrumbs = response.data.ancestors
  } catch (err) {
    throw err;
  }
}
export const fetchParentCatsAction = async (dispatch: any, id: number, filters: {
  Region?: string,
  SubRegion?: string,
  Frequency?: string,
  Units?: string,
  DataSet?: string,
  HistorProj?: string,
  SuppDemand?: string,
  LastUpdate?: string
}) => {
  async function buildTree(ancestors: [number]) {
    const j = ancestors.length
    for (let i = 0; i < j; i++) {

      await setTreeStructureAction(dispatch, '', ancestors[i], filters)
    }
  }
  try {

    const response = await axios({
      method: 'GET',
      url: '/api/categories/parents',
      params: {
        category_id: id
      }
    });

    buildTree(response.data.ancestors)
    // response.data[0].ancestors.map((ancestor: number) => {
    //   console.log(ancestor)
    //   setTreeStructureAction(dispatch, ancestor, filters)
    // })
    // for await (const ancestor of response.data[0].ancestors) {
    //   console.log(ancestor)
    //   setTreeStructureAction(dispatch, ancestor, filters)
    // }
    setSelectedTreeNodeAction(dispatch, id);


    // return dispatch({
    //   type: 'GET_PARENT_CATS',
    //   payload: { parents: response.data }
    // });
  } catch (error) { }
};


export const fetchCategoriesAction = async (
  dispatch: any,
  searchTerm: string,
  parent_category_id: number | null,
  filters: any,
  page: number,
  limit: number = 5,
) => {
  dispatch({ type: 'TREE_LOADING' });
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/categories/rowCards',
      params: {
        page: page,
        limit: limit,
        searchTerm: searchTerm,
        parent_category_id: parent_category_id,
        //treeNode: selectedTreeNode,
        ...filters,
        DataSet: filters.DataSet[0],

      },
    });
    console.log('FetchCategorieAction', response)
    //const dataJSON = await data.json();
    if (response.data.length === 0) {
      alert('No Categories Found');
    }
    dispatch({ type: 'TREE_FINISHED_LOADING' });
    return dispatch({
      type: 'FETCH_CATS',
      payload: {
        rowCategories: response.data.categories,
        page: response.data.page,
        totalCount: response.data.totalCount,
        id: parent_category_id,
      },
    });
  } catch (error) { }

};

export const fetchDataAction = async (
  dispatch: any,
  searchTerm: string,
  filters: any,
  treeSeries: any,
  page: number,
  limit: number
) => {
  // put this on the server to hide the api key
  //const URL = "https://api.eia.gov/search/?search_term=series_id&search_value=%22ELEC.CONS*%22&rows_per_page=1000"
  // https://api.eia.gov/search/?search_term=name&search_value=%22*%22&rows_per_page=100&page_num=0&data_set=ELEC&frequency=M&region=USA&units=thousand%20mcf&last_updated=2020-03-23T18:31:14Z
  // if hist is true, then filter out outlooks. if proj is true only include outlooks. They must have consistent unique
  // pattern in id or name . . . IOE, SOE, AOE

  const regionFilter = (filters: any) => {
    var optionCall;
    switch (filters.Region) {
      case 'United States': {
        optionCall = 'USA';
        break;
      }
      case 'OECD':
        {
          optionCall = 'OECD';
        }
        break;
      default:
        optionCall = filters.Region;
    }
    return optionCall;
  };

  //     case 'OECD': {
  //       optionCall =
  //         // need to replace "+" with "%2B"
  //         //"&region=AUS+AUT+BEL+CAN+CHE+CHL+CSK+CZE+DDR+DEU+DEUW+DNK+ESP+EST+FIN+FRA+GBR+GRC+GUM+HITZ+HUN+IRL+ISL+ISR+ITA+JPN+KOR+LTU+LUX+LVA+MEX+MNP+NLD+NOR+NZL+POL+PRI+PRT+SVK+SVN+SWE+TUR+USA+USOH+VIR";
  //         '&region=AUS%2BAUT%2BBEL%2BCAN%2BCHE%2BCHL%2BCSK%2BCZE%2BDDR%2BDEU%2BDEUW%2BDNK%2BESP%2BEST%2BFIN%2BFRA%2BGBR%2BGRC%2BGUM%2BHITZ%2BHUN%2BIRL%2BISL%2BISR%2BITA%2BJPN%2BKOR%2BLTU%2BLUX%2BLVA%2BMEX%2BMNP%2BNLD%2BNOR%2BNZL%2BPOL%2BPRI%2BPRT%2BSVK%2BSVN%2BSWE%2BTUR%2BUSA%2BUSOH%2BVIR';
  //       //"&region=BRB";
  //       break;
  //     }
  //     default: {
  //       optionCall = '';
  //     }
  //   }
  //   return optionCall;
  // };
  const USAdict = {
    'United States': 'USA',
    Alabama: 'USA-AL',
    Alaska: 'USA-AK',
    Arizona: 'USA-AZ',
    Arkansas: 'USA-AR'
  };
  const subRegionFilterOld = (filters: any) => {
    var optionCall;
    switch (filters.SubRegion) {
      case 'All': {
        optionCall = "('USA',USA-AL,USA-AK,USA-AZ ";
        break;
      }
      case 'Alabama': {
        optionCall = '&region=USA-AL';
        break;
      }
      case 'Alaska': {
        optionCall = '&region=USA-AK';
        break;
      }
      case 'Arizona': {
        optionCall = '&region=USA-AZ';
        break;
      }
      case 'Arkansas': {
        optionCall = '&region=USA-AR';
        break;
      }
      case 'California': {
        optionCall = '&region=USA-CA';
        break;
      }
      case 'Colorado': {
        optionCall = '&region=USA-CO';
        break;
      }
      case 'Connecticut': {
        optionCall = '&region=USA-CT';
        break;
      }
      case 'Delaware': {
        optionCall = '&region=USA-DE';
        break;
      }
      case 'Florida': {
        optionCall = '&region=USA-FL';
        break;
      }
      case 'Georgia': {
        optionCall = '&region=USA-GA';
        break;
      }
      case 'Hawaii': {
        optionCall = '&region=USA-HI';
        break;
      }
      case 'Idaho': {
        optionCall = '&region=USA-ID';
        break;
      }
      case 'Illinois': {
        optionCall = '&region=USA-IL';
        break;
      }
      case 'Indiana': {
        optionCall = '&region=USA-IN';
        break;
      }
      case 'Iowa': {
        optionCall = '&region=USA-IA';
        break;
      }
      case 'Kansas': {
        optionCall = '&region=USA-KS';
        break;
      }
      case 'Kentucky': {
        optionCall = '&region=USA-KY';
        break;
      }
      case 'Louisiana': {
        optionCall = '&region=USA-LA';
        break;
      }
      case 'Maine': {
        optionCall = '&region=USA-ME';
        break;
      }
      case 'Maryland': {
        optionCall = '&region=USA-MD';
        break;
      }
      case 'Massachusetts': {
        optionCall = '&region=USA-MA';
        break;
      }
      case 'Michigan': {
        optionCall = '&region=USA-MI';
        break;
      }
      case 'Minnesota': {
        optionCall = '&region=USA-MN';
        break;
      }
      case 'Mississippi': {
        optionCall = '&region=USA-MS';
        break;
      }
      case 'Missouri': {
        optionCall = '&region=USA-MO';
        break;
      }
      case 'Montana': {
        optionCall = '&region=USA-MT';
        break;
      }
      case 'Nebraska': {
        optionCall = '&region=USA-NE';
        break;
      }
      case 'Nevada': {
        optionCall = '&region=USA-NV';
        break;
      }
      case 'New Hampshire': {
        optionCall = '&region=USA-NH';
        break;
      }
      case 'New Jersey': {
        optionCall = '&region=USA-NJ';
        break;
      }
      case 'New Mexico': {
        optionCall = '&region=USA-NM';
        break;
      }
      case 'New York': {
        optionCall = '&region=USA-NY';
        break;
      }
      case 'North Carolina': {
        optionCall = '&region=USA-NC';
        break;
      }
      case 'North Dakota': {
        optionCall = '&region=USA-ND';
        break;
      }
      case 'Ohio': {
        optionCall = '&region=USA-OH';
        break;
      }
      case 'Oklahoma': {
        optionCall = '&region=USA-OK';
        break;
      }
      case 'Oregon': {
        optionCall = '&region=USA-OR';
        break;
      }
      case 'Pennsylvania': {
        optionCall = '&region=USA-PA';
        break;
      }
      case 'Rhode Island': {
        optionCall = '&region=USA-RI';
        break;
      }
      case 'South Carolina': {
        optionCall = '&region=USA-SC';
        break;
      }
      case 'South Dakota': {
        optionCall = '&region=USA-SD';
        break;
      }
      case 'Tennessee': {
        optionCall = '&region=USA-TN';
        break;
      }
      case 'Texas': {
        optionCall = '&region=USA-TX';
        break;
      }
      case 'Utah': {
        optionCall = '&region=USA-UT';
        break;
      }
      case 'Vermont': {
        optionCall = '&region=USA-VT';
        break;
      }
      case 'Virginia': {
        optionCall = '&region=USA-VA';
        break;
      }
      case 'Washington': {
        optionCall = '&region=USA-WA';
        break;
      }
      case 'West Virginia': {
        optionCall = '&region=USA-WV';
        break;
      }
      case 'Wisconsin': {
        optionCall = '&region=USA-WI';
        break;
      }
      case 'Wyoming': {
        optionCall = '&region=USA-WY';
        break;
      }
      // OECD Nations
      case 'Australia': {
        optionCall = '&region=AUS';
        break;
      }
      case 'Austria': {
        optionCall = '&region=AUT';
        break;
      }
      case 'Belgium': {
        optionCall = '&region=BEL';
        break;
      }
      case 'Canada': {
        optionCall = '&region=CAN';
        break;
      }
      case 'Switzerland': {
        optionCall = '&region=CHE';
        break;
      }
      case 'Germany': {
        optionCall = '&region=DEU';
        break;
      }
      case 'Denmark': {
        optionCall = '&region=DNK';
        break;
      }
      case 'Spain': {
        optionCall = '&region=ESP';
        break;
      }
      case 'Finland': {
        optionCall = '&region=FIN';
        break;
      }
      case 'France': {
        optionCall = '&region=FRA';
        break;
      }
      case 'Great Britain': {
        optionCall = '&region=GBR';
        break;
      }
      case 'Greece': {
        optionCall = '&region=GRC';
        break;
      }
      case 'Ireland': {
        optionCall = '&region=IRE';
        break;
      }
      case 'Iceland': {
        optionCall = '&region=ISL';
        break;
      }
      case 'Italy': {
        optionCall = '&region=ITA';
        break;
      }
      case 'Japan': {
        optionCall = '&region=JPN';
        break;
      }
      case 'South Korea': {
        optionCall = '&region=KOR';
        break;
      }
      case 'Luxemburg': {
        optionCall = '&region=LUX';
        break;
      }
      case 'Mexico': {
        optionCall = '&region=MEX';
        break;
      }
      case 'Netherlands': {
        optionCall = '&region=NLD';
        break;
      }
      case 'Norway': {
        optionCall = '&region=NOR';
        break;
      }
      case 'New Zealand': {
        optionCall = '&region=USA-NZL';
        break;
      }
      case 'Portugal': {
        optionCall = '&region=PRT';
        break;
      }
      case 'Sweden': {
        optionCall = '&region=SWE';
        break;
      }
      case 'Turkey': {
        optionCall = '&region=TUR';
        break;
      }
      case 'United States': {
        optionCall = '&region=USA';
        break;
      }
      // case "": {
      //   optionCall = "&region=USOH";
      //   break;
      // }
      case 'US Virgin Islands': {
        optionCall = '&region=VIR';
        break;
      }
      default: {
        optionCall = 'None';
      }
    }
    return optionCall;
  };

  const subRegionFilter = (filters: any) => {
    var optionCall;
    switch (filters.SubRegion) {
      case 'All': {
        optionCall = '%';
        break;
      }
      case 'None': {
        optionCall = '';
        break;
      }
      default:
        optionCall = '';
    }
    return optionCall;
  };

  const combineRegions = (filters: any, region: any, subregion: any) => {
    // if (filters.SubRegion === 'None') {
    //   return region;
    // } else {
    //   return subregion;
    // }
    return region + subregion;
  };
  const frequencyFilter = (filters: any) => {
    var optionCall;
    switch (filters.Frequency) {
      case 'Annual': {
        optionCall = '&frequency=A';
        break;
      }
      case 'Monthly': {
        optionCall = '&frequency=M';
        break;
      }
      case 'Daily': {
        optionCall = '&frequency=D';
        break;
      }
      default: {
        optionCall = '';
      }
    }
    return optionCall;
  };
  // I'm missing some units
  const unitsFilter = (filters: any) => {
    var optionCall;
    switch (filters.Units) {
      case 'GW': {
        optionCall = '&units=GW';
        break;
      }
      case 'BkWh': {
        optionCall = '&units=BkWh';
        break;
      }
      case 'bill kwh': {
        optionCall = '&units=bill kwh';
        break;
      }
      case 'quads': {
        optionCall = '&units=quads';
        break;
      }
      case 'non cents/kWh': {
        optionCall = '&units=non cents/kWh';
        break;
      }
      case 'nom $/MMBtu': {
        optionCall = '&units=nom $/MMBtu';
        break;
      }
      case 'quad Btu': {
        optionCall = '&units=quad Btu';
        break;
      }
      case 'MMst': {
        optionCall = '&units=MMst';
        break;
      }
      case 'billion kWh': {
        optionCall = '&units=billion kWh';
        break;
      }
      case 'percent': {
        optionCall = '&units=percent';
        break;
      }
      case '2017 cents/kWh': {
        optionCall = '&units=2017 cents/kWh';
        break;
      }
      case 'million MMBtu': {
        optionCall = '&units=million MMBtu';
        break;
      }
      case 'thousand tons': {
        optionCall = '&units=thousand tons';
        break;
      }
      case '2012 C/kwh': {
        optionCall = '&units=2012 C/kwh';
        break;
      }
      case 'nom C/kwh': {
        optionCall = '&units=nom C/kwh';
        break;
      }
      case '2019 C/kwh': {
        optionCall = '&units=2019 C/kwh';
        break;
      }
      case '2017 $/MMBtu': {
        optionCall = '&units=2017 $/MMBtu';
        break;
      }
      default: {
        optionCall = '';
      }
    }

    return optionCall;
  };

  const datasetFilter = (filters: any) => {
    var optionCall;
    switch (filters.DataSet) {
      case 'Annual Energy Outlook': {
        optionCall = '&data_set=AEO';
        break;
      }
      case 'Electricity': {
        optionCall = '&data_set=ELEC';
        break;
      }
      case 'International Energy Data': {
        optionCall = '&data_set=INTL';
        break;
      }
      case 'State Energy Data System': {
        optionCall = '&data_set=SEDS';
        break;
      }
      case 'International Energy Outlook': {
        optionCall = '&data_set=IEO';
        break;
      }
      case 'Short-Term Energy Outlook': {
        optionCall = '&data_set=STEO';
        break;
      }
      case 'Total Energy': {
        optionCall = '&data_set=TOTAL';
        break;
      }
      case 'Petroleum': {
        optionCall = '&data_set=PET';
        break;
      }
      default: {
        optionCall = '';
      }
    }
    return optionCall;
  };
  const region = regionFilter(filters);
  const subregion = subRegionFilter(filters);
  const combinedRegion = combineRegions(filters, region, subregion);
  const frequency = frequencyFilter(filters);
  const dataset = datasetFilter(filters);
  const units = unitsFilter(filters);

  //const URL = `https://api.eia.gov/search/?search_term=name&search_value="${searchTerm}"&rows_per_page=1000&page_num=0${combinedRegion}${frequency}${dataset}${units}`;
  //const URL = `/api/series/search:${searchTerm}`

  //console.log(URL);
  //const data = await fetch(URL);
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/series/search',
      params: {
        page: page,
        limit: limit,
        searchTerm: searchTerm,
        treeSeries: treeSeries,
        ...filters,
        Region: combinedRegion
      }
    });
    //const dataJSON = await data.json();
    if (response.data.length === 0) {
      alert('No Data Series Found');
    }
    // this might not work, because it will only look at first 1000 series. How to
    // specify ID? or DATA SET?---better
    //&data_set=AEO  Does this include non-projections?
    // const filteredJSON = (dataJSON: any, filters: any) => {
    //   if (filters.histOrProj === "Forecast") {
    //     console.log("projection");
    //     return dataJSON.response.docs.filter(
    //       (series: any) => "lastHistoricalPeriod" in series
    //     );
    //   } else if (filters.histOrProj === "Historical") {
    //     console.log("historical");
    //     return dataJSON.response.docs.filter(
    //       (series: any) => !("lastHistoricalPeriod" in series)
    //     );
    //   }
    // };
    // const filteredSeries = filteredJSON(dataJSON, filters);
    // console.log(filteredSeries);
    return dispatch({
      type: 'FETCH_DATA',
      payload: {
        series: response.data.series,
        count: response.data.totalCount
      }
    });
  } catch (error) { }
};

export const fetchChildSeriesAction = async (
  dispatch: any,
  category_id: number,
  custom_flag: string,
  geography: string,
  frequency: string,
) => {
  // take extra url parameter to test if this is custom category

  try {
    let response = { data: '' };

    //if (custom_flag === 'EIA') {
    response = await axios({
      method: 'GET',
      url: '/api/series/childseries',
      params: { category_id, geography, frequency, custom_flag },
    });
    // } else {
    //   // hit another api endpoint to get data series needed for custom data
    //   response = await axios({
    //     method: 'GET',
    //     url: '/api/series/custom_childseries',
    //     params: { category_id, geography, frequency, custom_flag },
    //   })
    // }
    console.log(response.data)
    return dispatch({
      type: 'FETCH_DATA_SERIES',
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataSeriesAction = async (
  dispatch: any,
  series_id: string,
  state: IEIA
) => {
  // if (
  //   state.seriesData.filter((series: any) => series.series_id === series_id)
  //     .length === 0
  // ) {
  // put this on the server to hide the api key
  try {
    //const URL = `https://api.eia.gov/series/?api_key=${key}&series_id=${series_id}`;

    const response = await axios({
      method: 'GET',
      url: '/api/series/dataset',
      params: { series_id }
    });

    return dispatch({
      type: 'FETCH_DATA_SERIES',
      payload: response.data
    });
    // } else {
    //   return dispatch({
    //     type: "FETCH_DATA_SERIES",
    //     payload: null,
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const clearSearchAction = (dispatch: any) => {
  return dispatch({
    type: 'CLEAR_SERIES',
    payload: null
  });
};

export const setCardRowsAction = async (
  dispatch: any,
  searchTerm: string,
  parent_category_id: number | null,
  filters: any,
  page: number,
  limit: number = 5,
) => {
  dispatch({ type: 'TREE_LOADING' });
  try {
    // I should change the category service to let me send an 
    // array of category ids to the treeAndCards service. These will be the 
    // row parent cats (I should be able to get them from the tree in the store)
    // if this array is included as a parameter we can skip the first tree builder
    // query to the database
    const response = await axios({
      method: 'GET',
      url: 'api/categories/treeAndCards',
      params: {
        page: 1,
        limit,
        searchTerm,
        ...filters,
        DataSet: filters.DataSet[0],
        SubRegion: 'None',
        parent_category_id,
      }
    })
    if (response.data.length === 0) {
      alert('No Categories Found');
    }
    dispatch({ type: 'TREE_FINISHED_LOADING' });
    // if the result set is empty, I should check the 
    // store rowCards for a row with id that matches 
    // the parent category id and dispatch the action with that
    // as the payload. 
    // also specify that the accordion should be open.
    dispatch({
      type: 'SET_CARD_ROWS',
      payload: {
        node_id: parent_category_id,
        rowCards: response.data[1],
      },
    });

     if (Object.keys(response.data[1]).length === 0) {
      console.log('DISPATCHING SET ROW OF LEAVES')
      dispatch({
        type: 'SET_ROW_OF_LEAVES',
        payload: parent_category_id,
      }
      )
      // get the cards for the row of leaves
      fetchCategoriesAction(
        dispatch,
        searchTerm,
        parent_category_id,
        filters,
        1,
        5,
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const toggleRowAction = (id: number, dispatch: any) => {
  dispatch({ type: 'TOGGLE_ROW', payload: id });
};

export const setTreeStructureAction = async (
  dispatch: any,
  searchTerm: string,
  category_id: number,
  filters: any
) => {
  console.log('SET TREE STRUCTURE')
  dispatch({ type: 'TREE_LOADING' });
  try {

    const response = await axios({
      method: 'GET',
      url: '/api/categories/treeAndCards',
      params: {
        page: 1,
        limit: 1000,
        searchTerm: searchTerm,
        ...filters,
        DataSet: filters.DataSet[0],
        SubRegion: 'None',
        // Frequency: 'All',
        // Units: 'All',
        // // changed from 'all' to reduce data for development
        // DataSet: 'Annual Energy Outlook%',
        // HistorProj: 'All',
        // SuppDemand: 'All',
        // LastUpdate: 'All',
        parent_category_id: category_id
      }
    });
    console.log('FROM ACTION')
    console.log(Object.keys(response.data[1]))
    if (response.data.length === 0) {

      console.log('No Categories Found');


    }
    dispatch({ type: 'TREE_FINISHED_LOADING' });
    // make sure the state is getting set correctly--then maybe the issue is with 
    // the tree parsing program in Finderjs (does one exist?) 
    dispatch({
      type: 'SET_TREE_STRUCTURE',
      payload: {
        tree_leaves: response.data[0].sort((a: any, b: any) => {
          if (a.name > b.name) {
            return 1
          }
          return -1
        }),
        node_id: category_id,
        rowCards: response.data[1],
      }
    });
    if (Object.keys(response.data[1]).length === 0) {
      console.log('DISPATCHING SET ROW OF LEAVES')
      dispatch({
        type: 'SET_ROW_OF_LEAVES',
        payload: category_id,
      }
      )
    // get the cards for the row of leaves
      fetchCategoriesAction(
        dispatch,
        searchTerm,
        category_id,
        filters,
        1,
        5,
      );
    }

  } catch (error) {
    console.log(error);
  }
};

export const setMenuCatsAction = async (
  dispatch: any,
  category_id: number = 371,
  filter: string,
  other_filter1: any,
  other_filter2: any
) => {
  try {
    let response;
    let response_array;
    if (filter === "DataSet") {
      response = await axios({
        method: 'GET',
        url: '/api/categories/treeAndCards',
        params: {
          page: 1,
          limit: 1000,
          searchTerm: '',
          Region: other_filter1,
          SubRegion: 'None',
          Frequency: 'A',
          Units: 'All',
          // // changed from 'all' to reduce data for development
          DataSet: 'All',
          HistorProj: other_filter2,
          SuppDemand: 'All',
          LastUpdate: 'All',
          parent_category_id: category_id,
        }

      })
      response_array = response?.data[0].sort((a: any, b: any) => {
        if (a.name > b.name) {
          return 1
        }
        return -1
      })
    } else if (filter === "Region") {
      response = await axios({
        method: 'GET',
        // this won't work, because it will return an array of categories.
        // for this one I want and array of strings (country codes);
        // have to add a new service to the backend (and a new controller?)
        url: '/api/categories/menu',
        params: {
          dataset_id: other_filter1,
          hist_or_proj: other_filter2

        }
      })
      response_array = response.data.map((element: any) => element.geography)
    } else if (filter === "HistorProj") {
      response_array = ['All', 'Historical', 'Projection']
    }

    if (response?.data.length === 0) {
      alert('No Categories Found');
    }
    // make sure the state is getting set correctly--then maybe the issue is with 
    // the tree parsing program in Finderjs (does one exist?) 
    let action_type;
    switch (filter) {
      case 'DataSet':
        action_type = 'SET_MENU_TOPCATS';
        break;
      case 'Region':
        action_type = 'SET_MENU_REGIONS';
        break;
      case 'HistorProj':
        action_type = 'SET_MENU_HIST_OR_PROJ'
        break;
      default:
        action_type = '';
    }

    return dispatch({
      type: action_type,
      // this is written for DataSet filter. needs to handle case of 
      // Region filter as well. Needs to work with new logic added on the 
      // backend.
      payload: {
        options_array: response_array,
        node_id: category_id
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const setTreeSeriesAction = (dispatch: any, treeSeries: []) => {
  return dispatch({
    type: 'SET_TREE_SERIES',
    payload: treeSeries
  });
};

export const setMenuSelectionAction = (dispatch: any, selection: any) => {
  return dispatch({
    type: "SET_MENU_SELECTION",
    payload: selection,
  })
}
export const setFilterAction = (dispatch: any, filter: any) => {
  setSelectedTreeNodeAction(dispatch, 371);
  setSearchNodeAction(dispatch, 371);

  return dispatch({
    type: 'SET_FILTER',
    payload: filter
  });
};

export const setSearchTermAction = (dispatch: any, searchTerm: string) => {
  return dispatch({
    type: 'SET_SEARCH_TERM',
    payload: searchTerm
  });
};

export const toggleCatSeriesAction = (dispatch: any, selection: string) => {
  return dispatch({
    type: 'TOGGLE_CATSERIES',
    payload: selection
  });
};
export const setPageAction = (dispatch: any, page: number, id: number) => {
  console.log('SET PAGE', [page, id])
  return dispatch({
    type: 'SET_PAGE',
    payload: [page, id]
  });
};

export const resetPageAction = (dispatch: any) => {
  return dispatch({
    type: 'RESET_PAGE'
  });
};

export const setLimitAction = (dispatch: any, limit: number) => {
  return dispatch({
    type: 'SET_LIMIT',
    payload: limit,
  });
};

export const freshStartAction = (dispatch: any) => {
  return dispatch({
    type: 'FRESH_START',
  });
};

export const toggleSelectAction = (
  state: IEIA,
  dispatch: any,
  series: ISeries | any
): IAction => {
  const seriesInSel = state.selected.includes(series);
  let dispatchObj = {
    type: 'ADD_SEL',
    payload: series
  };
  if (seriesInSel) {
    const selWithoutSeries = state.selected.filter(
      (select: ISeries) => select.series_id !== series.series_id
    );
    dispatchObj = {
      type: 'REMOVE_SEL',
      payload: selWithoutSeries
    };
  }

  return dispatch(dispatchObj);
};
