import React, {useState} from 'react';
import SearchBar from './SearchBar';
import SimpleMenu from './Menu';
import RecordsPerPage from './components/pagination/RecordsPerPage';
import {Pagination} from './components/pagination/Pagination'
import { ISeriesProps, IStore } from './types';

import {
  fetchDataAction,
  toggleSelectAction
} from './redux/actions/eia/actions';
import { useDispatch, useSelector } from 'react-redux';

const SeriesList = React.lazy<any>(() => import('./SeriesList'));

export default function HomePage() {
  const dispatch = useDispatch();
  const state = useSelector((state: IStore) => state.eia);
;
  //const { state, dispatch } = React.useContext(Store);


  // React.useEffect(() => {
  //   state.treeCats.length === 0 && fetchTreeCatsAction(dispatch, "371");
  //   console.log(state)
  // });
  console.log('home');
  console.log(state);

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
        subRegOption = ['All'].concat(states);
        break;
      }
      case 'OECD': {
        subRegOption = ['All'].concat(OECDnations);
        break;
      }
      default: {
        subRegOption = ['None'].concat(states).concat(OECDnations);
      }
    }
    return subRegOption;
  };

  const subRegion = subRegions(state, states, OECDnations);
  console.log(subRegion);
  // build props to send to SeriesList. If there are series from search (state.series), send that,
  // otherwise send tree series from tree navigation.
  const props: ISeriesProps = {
    series: state.series,
    store: { state, dispatch },
    toggleSelectAction,
    selected: state.selected
  };
  console.log(props);
  console.log(state.treeSeries);
  return (
    <React.Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <div className="search-area">
          <div className="search-bar">
            <SearchBar />
          </div>
          <div className="menu-area">
            <div className="sub-menu">
              <SimpleMenu
                filter={'Region'}
                options={['All', 'United States', 'OECD']}
              />
              <SimpleMenu filter={'SubRegion'} options={subRegion} />
            </div>
            <SimpleMenu
              filter={'Frequency'}
              options={['All', 'Annual', 'Monthly', 'Daily']}
            />
            <SimpleMenu
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
            />
            <SimpleMenu
              filter={'DataSet'}
              options={[
                'All',
                'Annual Energy Outlook',
                'Electricity',
                'International Energy Data',
                'State Energy Data System',
                'International Energy Outlook',
                'Short-Term Energy Outlook',
                'Total Energy',
                'Petroleum'
              ]}
            />
            <SimpleMenu filter={'Last Updated'} options={['dummy']} />
          </div>
          <div>
            <RecordsPerPage/>
          </div>

          <br />
          <br />
        </div>

        <br />
        <br />

        <section className="series-layout">
          <SeriesList {...props} />
        </section>
      </React.Suspense>
      <Pagination/>
    </React.Fragment>
  );
}
