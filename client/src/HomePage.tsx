import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import SimpleMenu from './Menu';
import FinderTree from './FinderTree';
import AddButton from './components/add-button/AddButton';
import RecordsPerPage from './components/pagination/RecordsPerPage';
import { Pagination } from './components/pagination/Pagination';
import { ISeriesProps, ICategoriesProps, IStore } from './types';
import { Button, makeStyles } from '@material-ui/core';

import {
  fetchDataAction,
  toggleSelectAction,
  toggleCatSeriesAction,
  freshStartAction,
} from './redux/actions/eia/actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const SeriesList = React.lazy<any>(() => import('./SeriesList'));

export default function HomePage() {
  const dispatch = useDispatch();

  // didn't work to prevent infinite loop. FinderTree still needs to be memoized
  // -- figure out exactly what is memo is doing to prevent infinite loop.
  // -- is memo preventing my tree from remembering how to open to the selected leaf?
  // -- maybe I should call the action that opens the tree to the leaf in useEffect?
  // -- or call the action that opens the tree to an indermediate category whenever I 
  // add a new column?
  //const state = useSelector((state: IStore) => state.eia, shallowEqual);
  const filters = useSelector((state: IStore) => state.eia.filters, shallowEqual);
  const categories = useSelector((state: IStore) => state.eia.categories, shallowEqual);
  const selected = useSelector((state: IStore) => state.eia.selected, shallowEqual);
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
    filters: any,
    states: Array<string>,
    OECDnations: Array<string>
  ) => {
    var subRegOption;
    switch (filters.Region) {
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

  const subRegion = subRegions(filters, states, OECDnations);

  // build props to send to SeriesList. If there are series from search (state.series), send that,
  // otherwise send tree series from tree navigation.
  // const props: ISeriesProps = {
  //   series: state.series,
  //   store: { state, dispatch },
  //   toggleSelectAction,
  //   selected: state.selected
  // };
  const cat_props: ICategoriesProps = {
    categories: categories,
    toggleSelectAction,
    selected: selected
  };
  let menu_options_logical = ['USA', "AFG",
    "ALB",
    "DZA",
    "ASM",
    "AND",
    "AGO",
    "AIA",
    "ATA",
    "ATG",
    "ARG",
    "ARM",
    "ABW",
    "AUS",
    "AUT",
    "AZE",
    "BHS",
    "BHR",
    "BGD",
    "BRB",
    "BLR",
    "BEL",
    "BLZ",
    "BEN",
    "BMU",
    "BTN",
    "BOL",
    "BOL",
    "BIH",
    "BWA",
    "BVT",
    "BRA",
    "IOT",
    "BRN",
    "BRN",
    "BGR",
    "BFA",
    "BDI",
    "KHM",
    "CMR",
    "CAN",
    "CPV",
    "CYM",
    "CAF",
    "TCD",
    "CHL",
    "CHN",
    "CXR",
    "CCK",
    "COL",
    "COM",
    "COG",
    "COD",
    "COK",
    "CRI",
    "CIV",
    "CIV",
    "HRV",
    "CUB",
    "CYP",
    "CZE",
    "DNK",
    "DJI",
    "DMA",
    "DOM",
    "ECU",
    "EGY",
    "SLV",
    "GNQ",
    "ERI",
    "EST",
    "ETH",
    "FLK",
    "FRO",
    "FJI",
    "FIN",
    "FRA",
    "GUF",
    "PYF",
    "ATF",
    "GAB",
    "GMB",
    "GEO",
    "DEU",
    "GHA",
    "GIB",
    "GRC",
    "GRL",
    "GRD",
    "GLP",
    "GUM",
    "GTM",
    "GGY",
    "GIN",
    "GNB",
    "GUY",
    "HTI",
    "HMD",
    "VAT",
    "HND",
    "HKG",
    "HUN",
    "ISL",
    "IND",
    "IDN",
    "IRN",
    "IRQ",
    "IRL",
    "IMN",
    "ISR",
    "ITA",
    "JAM",
    "JPN",
    "JEY",
    "JOR",
    "KAZ",
    "KEN",
    "KIR",
    "PRK",
    "KOR",
    "KOR",
    "KWT",
    "KGZ",
    "LAO",
    "LVA",
    "LBN",
    "LSO",
    "LBR",
    "LBY",
    "LBY",
    "LIE",
    "LTU",
    "LUX",
    "MAC",
    "MKD",
    "MDG",
    "MWI",
    "MYS",
    "MDV",
    "MLI",
    "MLT",
    "MHL",
    "MTQ",
    "MRT",
    "MUS",
    "MYT",
    "MEX",
    "FSM",
    "MDA",
    "MCO",
    "MNG",
    "MNE",
    "MSR",
    "MAR",
    "MOZ",
    "MMR",
    "MMR",
    "NAM",
    "NRU",
    "NPL",
    "NLD",
    "ANT",
    "NCL",
    "NZL",
    "NIC",
    "NER",
    "NGA",
    "NIU",
    "NFK",
    "MNP",
    "NOR",
    "OMN",
    "PAK",
    "PLW",
    "PSE",
    "PAN",
    "PNG",
    "PRY",
    "PER",
    "PHL",
    "PCN",
    "POL",
    "PRT",
    "PRI",
    "QAT",
    "REU",
    "ROU",
    "RUS",
    "RUS",
    "RWA",
    "SHN",
    "KNA",
    "LCA",
    "SPM",
    "VCT",
    "VCT",
    "VCT",
    "WSM",
    "SMR",
    "STP",
    "SAU",
    "SEN",
    "SRB",
    "SYC",
    "SLE",
    "SGP",
    "SVK",
    "SVN",
    "SLB",
    "SOM",
    "ZAF",
    "SGS",
    "SSD",
    "ESP",
    "LKA",
    "SDN",
    "SUR",
    "SJM",
    "SWZ",
    "SWE",
    "CHE",
    "SYR",
    "TWN",
    "TWN",
    "TJK",
    "TZA",
    "THA",
    "TLS",
    "TGO",
    "TKL",
    "TON",
    "TTO",
    "TUN",
    "TUR",
    "TKM",
    "TCA",
    "TUV",
    "UGA",
    "UKR",
    "ARE",
    "GBR",
    "UMI",
    "URY",
    "UZB",
    "VUT",
    "VEN",
    "VEN",
    "VNM",
    "VNM",
    "VGB",
    "VIR",
    "WLF",
    "ESH",
    "YEM",
    "ZMB",
    "ZWE"];

  let menu_options_display = ['United States', 'Afghanistan',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia, Plurinational State of',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei Darussalam',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Colombia',
    'Comoros',
    'Congo',
    'Congo, the Democratic Republic of the',
    'Cook Islands',
    'Costa Rica',
    'Cote d\'Ivoire',
    'Ivory Coast',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands (Malvinas)',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and McDonald Islands',
    'Holy See (Vatican City State)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran, Islamic Republic of',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, Democratic People\'s Republic of',
    'Korea, Republic of',
    'South Korea',
    'Kuwait',
    'Kyrgyzstan',
    'Lao People\'s Democratic Republic',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libyan Arab Jamahiriya',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Macedonia, the former Yugoslav Republic of',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia, Federated States of',
    'Moldova, Republic of',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Burma',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestinian Territory, Occupied',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russian Federation',
    'Russia',
    'Rwanda',
    'Saint Helena, Ascension and Tristan da Cunha',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Saint Vincent & the Grenadines',
    'St. Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan, Province of China',
    'Taiwan',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States Minor Outlying Islands',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela, Bolivarian Republic of',
    'Venezuela',
    'Viet Nam',
    'Vietnam',
    'Virgin Islands, British',
    'Virgin Islands, U.S.',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',];
  let menu_options_full: Record<string, string> = {};
  menu_options_logical.forEach((logical_key: any, index) => menu_options_full[logical_key] = menu_options_display[index])
  //let menu_options_full = menu_options_display.map((option, index) => [option, menu_options_logical[index]])
  return (
    <React.Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="search-area">
          <div className="search-bar">
            <h4>Search EIA Data</h4>
            <div className="menu-area">

              <div className="sub-menu">

                <SimpleMenu
                  filter={'Country'}
                  //get array of country abbreviations and zip it together with the 
                  //array of expanded names, then save in a variable and pass to options. use map . . .
                  // const map1 = array1.map((x, index) => [x, array2[index]]);
                  options_dict={menu_options_full}
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
                  ['All', 'All'],
                  ['Annual Energy Outlook 2014', 'Annual Energy Outlook 2014'],
                  ['Annual Energy Outlook 2015', 'Annual Energy Outlook 2015'],
                  ['Annual Energy Outlook 2016', 'Annual Energy Outlook 2016'],
                  ['Annual Energy Outlook 2017', 'Annual Energy Outlook 2017'],
                  ['Annual Energy Outlook 2018', 'Annual Energy Outlook 2018'],
                  ['Annual Energy Outlook 2019', 'Annual Energy Outlook 2019'],
                  ['Annual Energy Outlook 2020', 'Annual Energy Outlook 2020'],
                  ['Electricity', 'Electricity'],
                  ['International Energy Data', 'International Energy Data'],
                  ['State Energy Data System', 'State Energy Data System'],
                  ['International Energy Outlook', 'International Energy Outlook'],
                  ['Short-Term Energy Outlook', 'Short-Term Energy Outlook'],
                  ['Total Energy', 'Total Energy'],
                  ['Petroleum', 'Petroleum'],
                ]}

              />
              <Button
                style={{
                  textDecoration: 'none',
                  border: '2px blue solid',
                  height: '48px',
                  width: '80px'
                }}
                onClick={() => freshStartAction(dispatch)}
              >
                Fresh Start
          </Button>

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
       <div className="menu-area">
          
         
        <div className="sub-menu">
        <p>Click on a Category to drill-down or use Keyword Search to find time series data.</p>
        <p>Search Results appear below the Category Tree.</p>
        <p>Click on a 'DataGroup' card to open the tree and find data.</p>
        <p>Filter selections will restrict search results and the available categories in the tree.</p>
        <p>If you make a selection in the tree, keyword search will only return results under the selected category.</p>
        <p>Data can be accessed from source here: <a href='https://www.eia.gov/opendata/qb.php'>https://www.eia.gov/opendata/qb.php</a></p>
          
         </div>
         <div className="curatedDataGroups">
           <h4>Curated DataGroups</h4>
           {/* <ul><Link to="/demo/details/1/custom">US ELEC</Link></ul>  */}
           <ul><Link to="/demo/details/1/kaya">US KAYA DATA</Link></ul> 
         </div>
         
         </div>
         
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
