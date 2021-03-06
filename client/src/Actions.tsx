import { IAction, ISeries, IEIA } from './types';

//const key = process.env.REACT_APP_EIA_API_KEY;
const key = 'd329ef75e7dfe89a10ea25326ada3c43';

export const fetchDataAction = async (
  dispatch: any,
  searchTerm: string,
  filters: any
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
        optionCall = '&region=USA';
        break;
      }
      case 'OECD': {
        optionCall =
          // need to replace "+" with "%2B"
          //"&region=AUS+AUT+BEL+CAN+CHE+CHL+CSK+CZE+DDR+DEU+DEUW+DNK+ESP+EST+FIN+FRA+GBR+GRC+GUM+HITZ+HUN+IRL+ISL+ISR+ITA+JPN+KOR+LTU+LUX+LVA+MEX+MNP+NLD+NOR+NZL+POL+PRI+PRT+SVK+SVN+SWE+TUR+USA+USOH+VIR";
          '&region=AUS%2BAUT%2BBEL%2BCAN%2BCHE%2BCHL%2BCSK%2BCZE%2BDDR%2BDEU%2BDEUW%2BDNK%2BESP%2BEST%2BFIN%2BFRA%2BGBR%2BGRC%2BGUM%2BHITZ%2BHUN%2BIRL%2BISL%2BISR%2BITA%2BJPN%2BKOR%2BLTU%2BLUX%2BLVA%2BMEX%2BMNP%2BNLD%2BNOR%2BNZL%2BPOL%2BPRI%2BPRT%2BSVK%2BSVN%2BSWE%2BTUR%2BUSA%2BUSOH%2BVIR';
        //"&region=BRB";
        break;
      }
      default: {
        optionCall = '';
      }
    }
    return optionCall;
  };

  const subRegionFilter = (filters: any) => {
    var optionCall;
    switch (filters.SubRegion) {
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

  const combineRegions = (filters: any, region: any, subregion: any) => {
    if (filters.SubRegion === 'None') {
      return region;
    } else {
      return subregion;
    }
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


  const URL = `https://api.eia.gov/search/?search_term=name&search_value="${searchTerm}"&rows_per_page=1000&page_num=0${combinedRegion}${frequency}${dataset}${units}`;

  const data = await fetch(URL);
  const dataJSON = await data.json();

  if (dataJSON.response.numFound === 0) {
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
    payload: dataJSON.response.docs
  });
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
  const URL = `https://api.eia.gov/series/?api_key=${key}&series_id=${series_id}`;

  const data = await fetch(URL);
  const dataJSON = await data.json();

  return dispatch({
    type: 'FETCH_DATA_SERIES',
    payload: dataJSON.series[0]
  });
  // } else {
  //   return dispatch({
  //     type: "FETCH_DATA_SERIES",
  //     payload: null,
  //   });
  // }
};

export const clearSearchAction = (dispatch: any) => {
  return dispatch({
    type: 'CLEAR_SERIES',
    payload: null
  });
};

export const setTreeSeriesAction = (dispatch: any, treeSeries: {}) => {
  return dispatch({
    type: 'SET_TREE_SERIES',
    payload: treeSeries
  });
};

export const setFilterAction = (dispatch: any, filter: any) => {
  return dispatch({
    type: 'SET_FILTER',
    payload: filter
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
