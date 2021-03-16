import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SimpleMenu from './Menu';
import FinderTree from './FinderTree';
import AddButton from './components/add-button/AddButton';
import RecordsPerPage from './components/pagination/RecordsPerPage';
import { Pagination } from './components/pagination/Pagination';
import { ISeriesProps, ICategoriesProps, IStore } from './types';

import {
  fetchDataAction,
  toggleSelectAction,
  toggleCatSeriesAction
} from './redux/actions/eia/actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const SeriesList = React.lazy<any>(() => import('./SeriesList'));

export default function HomePage() {
  const dispatch = useDispatch();
  const state = useSelector((state: IStore) => state.eia, shallowEqual);
  //const { state, dispatch } = React.useContext(Store);

  // React.useEffect(() => {
  //   state.treeCats.length === 0 && fetchTreeCatsAction(dispatch, "371");
  //   console.log(state)
  // });
  const states = [
    'Alabama',

    'Alaska',

    'Arizona',

    'Arkansas',

    'California',

    'Colorado',

    'Connecticut',

    'Delaware',

    'Florida',

    'Georgia',

    'Hawaii',

    'Idaho',

    'Illinois',

    'Indiana',

    'Iowa',

    'Kansas',

    'Kentucky',

    'Louisiana',

    'Maine',

    'Maryland',

    'Massachusetts',

    'Michigan',

    'Minnesota',

    'Mississippi',

    'Missouri',

    'Montana',

    'Nebraska',

    'Nevada',

    'New Hampshire',

    'New Jersey',

    'New Mexico',

    'New York',

    'North Carolina',

    'North Dakota',

    'Ohio',

    'Oklahoma',

    'Oregon',

    'Pennsylvania',

    'Rhode Island',

    'South Carolina',

    'South Dakota',

    'Tennessee',

    'Texas',

    'Utah',

    'Vermont',

    'Virginia',

    'Washington',

    'West Virginia',

    'Wisconsin',

    'Wyoming'
  ];

  const OECDnations = [
    'Australia',

    'Austria',

    'Belgium',

    'Canada',
    'Chile',
    'Colombia',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Israel',
    'Italy',
    'Japan',
    'Korea',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Mexico',
    'Netherlands',
    'New Zealand',
    'Norway',
    'Poland',
    'Portugal',
    'Slovak Republic',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'United Kingdom',
    'United States'
  ];
  const subRegions = (
    state: any,
    states: Array<string>,
    OECDnations: Array<string>
  ) => {
    var subRegOption;
    switch (state.filters.Region) {
      // create cases that take region and assign array of sub regions
      // that get sent to sub-region menu. query is created by region
      // filter in Actions--this handles all Region and Sub region filters.
      case 'United States': {
        subRegOption = ['None', 'All'].concat(states);
        break;
      }
      case 'OECD': {
        subRegOption = ['None', 'All'].concat(OECDnations);
        break;
      }
      default: {
        subRegOption = ['None', 'All'].concat(states).concat(OECDnations);
      }
    }
    return subRegOption;
  };

  const subRegion = subRegions(state, states, OECDnations);

  // build props to send to SeriesList. If there are series from search (state.series), send that,
  // otherwise send tree series from tree navigation.
  const props: ISeriesProps = {
    series: state.series,
    store: { state, dispatch },
    toggleSelectAction,
    selected: state.selected
  };
  const cat_props: ICategoriesProps = {
    categories: state.categories,
    store: { state, dispatch },
    toggleSelectAction,
    selected: state.selected
  };

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <div className="search-area">
          <div className="search-bar">
            <h4>Search EIA Data</h4>
          <div className="menu-area">
            
            <div className="sub-menu">
              
              <SimpleMenu
                filter={'Country'}
                options={['USA','ABW',
'AFG',
'AGO',
'ALB',
'ARE',
'ARG',
'ARM',
'ASM',
'ATA',
'ATG',
'AUS',
'AUT',
'AZE',
'BDI',
'BEL',
'BEN',
'BFA',
'BGD',
'BGR',
'BHR',
'BHS',
'BIH',
'BLR',
'BLZ',
'BMU',
'BOL',
'BRA',
'BRB',
'BRN',
'BTN',
'BWA',
'CAF',
'CAN',
'CHE',
'CHL',
'CHN',
'CIV',
'CMR',
'COD',
'COG',
'COK',
'COL',
'COM',
'CPV',
'CRI',
'CSK',
'CUB',
'CYM',
'CYP',
'CZE',
'DDR',
'DEU',
'DEUW',
'DJI',
'DMA',
'DNK',
'DOM',
'DZA',
'ECU',
'EGY',
'ERI',
'ESH',
'ESP',
'EST',
'ETH',
'FIN',
'FJI',
'FLK',
'FRA',
'FRO',
'FSM',
'GAB',
'GBR',
'GEO',
'GHA',
'GIB',
'GIN',
'GLP',
'GMB',
'GNB',
'GNQ',
'GRC',
'GRD',
'GRL',
'GTM',
'GUF',
'GUM',
'GUY',
'HITZ',
'HKG',
'HND',
'HRV',
'HTI',
'HUN',
'IDN',
'IRL',
'IRN',
'IRQ',
'ISL',
'ISR',
'ITA',
'JAM',
'JOR',
'JPN',
'KAZ',
'KEN',
'KGZ',
'KHM',
'KIR',
'KNA',
'KWT',
'LAO',
'LBN',
'LBR',
'LBY',
'LCA',
'LKA',
'LSO',
'LTU',
'LUX',
'LVA',
'MAC',
'MAR',
'MDA',
'MDG',
'MDV',
'MEX',
'MKD',
'MLI',
'MLT',
'MMR',
'MNE',
'MNG',
'MNP',
'MOZ',
'MRT',
'MSR',
'MTQ',
'MUS',
'MWI',
'MYS',
'NAM',
'NCL',
'NER',
'NGA',
'NIC',
'NIU',
'NLDA',
'NLD',
'NOR',
'NPL',
'NRU',
'NZL',
'OMN',
'VEN',
'PAK',
'PAN',
'PER',
'PHL',
'PNG',
'POL',
'PRI',
'PRK',
'PRT',
'PRY',
'PSE',
'PYF',
'QAT',
'REU',
'ROU',
'RWA',
'SAU',
'SCG',
'SDN',
'SEN',
'SGP',
'SHN',
'SLB',
'SLE',
'SLV',
'SOM',
'SPM',
'SRB',
'SSD',
'STP',
'SUN',
'SUR',
'SVK',
'SVN',
'SWE',
'SWZ',
'SYC',
'SYR',
'TCA',
'TCD',
'TGO',
'THA',
'TJK',
'TKM',
'TLS',
'TON',
'TTO',
'TUN',
'TUR',
'TUV',
'TWN',
'TZA',
'UGA',
'UKR',
'URY',
'USIQ',
'USOH',
'UZB',
'VCT',
'VGB',
'VIR',
'VNM',
'VUT',
'WAK',
'WLD',
'IND',
'RUS',
'KOR',
'WSM',
'XKS',
'YEM',
'YUG',
'ZAF',
'ZMB',
'ZWE',]}
              />
              {/* <SimpleMenu filter={'SubRegion'} options={subRegion} /> */}
            </div>
            {/* <SimpleMenu
              filter={'Frequency'}
              options={['All', 'Annual', 'Monthly', 'Daily']}
            /> */}
            {/* <SimpleMenu
              filter={'Units'}
              options={[
                'All',
                'GW',
                'BkWh',
                'bill kwh',
                'quads',
                'non cents/kWh',
                'nom $/MMBtu',
                'quad Btu',
                'MMst',
                'billion kWh',
                'percent',
                '2017 cents/kWh',
                'billion Btu',
                'thousand tons',
                '2012 C/kwh',
                'nom C/kwh',
                'million MMBtu',
                '2019 C/kwh',
                '2017 $/MMBtu'
              ]} 
            />*/}
            <SimpleMenu
              filter={'Top-Level Category'}
              options={[
                'All',
                'Annual Energy Outlook 2014',
                'Annual Energy Outlook 2015',
                'Annual Energy Outlook 2016',
                'Annual Energy Outlook 2017',
                'Annual Energy Outlook 2018',
                'Annual Energy Outlook 2019',
                'Annual Energy Outlook 2020',
                'Electricity',
                'International Energy Data',
                'State Energy Data System',
                'International Energy Outlook',
                'Short-Term Energy Outlook',
                'Total Energy',
                'Petroleum'
              ]}
              
            />
            
            {/* <SimpleMenu
              filter={'Historical/Projection'}
              options={['All', 'Historical', 'Projection']}
            /> */}
            {/* <SimpleMenu
              filter={'Supply/Demand'}
              options={['All', 'Supply', 'Demand']}
            /> */}
            {/* <SimpleMenu
              filter={'Last Updated'}
              options={[
                'All',
                'After 2021-01-01',
                'After 2020-12-01',
                'After 2020-11-01',
                'After 2020-10-01'
              ]}
            /> */}
          </div>
            
          {/* <div>
            <RecordsPerPage />
          </div> */}
          
         
          <div>
             <SearchBar />
          </div>
        <br></br>
        </div>
          
          </div>
          <p>Click on a Category to drill-down or use Keyword Search to find time series data.</p>
        <p>Search Results appear below the Category Tree.</p>
        <p>Click on a 'DataGroup' card to open the tree and find data.</p>
        <p>Filter selections will restrict search results and the available categories in the tree.</p>
        <p>If you make a selection in the tree, keyword search will only return results under the selected category.</p>
        <p>Data can be accessed from source here: https://www.eia.gov/opendata/qb.php?category=371</p>
        <div>
          <FinderTree />
        </div>
        <section className="treeAndSeries">
          <div>
            <div className="series-layout">
              {/* changed from props to cat_props to send categories */}
              <SeriesList {...cat_props} />
            </div>
            <Pagination />
          </div>
        </section>
      </React.Suspense>
    </React.Fragment>
  );
}
