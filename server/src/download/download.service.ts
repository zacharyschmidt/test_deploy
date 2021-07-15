import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

//inject a task queue here and create the excel sheet using th

// define class to generate excel sheet and inject into
// download controller. The controller will pass in the data.
@Injectable()
export class DownloadService {
	//   constructor(
	//     @InjectRepository(CategoryEntity)
	//     private categoryRepository: Repository<CategoryEntity>,

	//   ) { }

	createIEORIS = (ancestor_names: string[]) => {
		let year = ancestor_names[1].slice[-4];
		return (
			`TY  - DATA
    KW  - International Energy Outlook IEO EIA Energy Information Administration long term forecast projection international production consumption trade electricity petroleum natural gas coal nuclear renewable hydroelectric
    N1  - The International Energy Outlook (IEO) presents the U.S. Energy Information Administration’s (EIA) assessment of the outlook for international energy markets. 
    PB  - Energy Information Administration, U.S. Department of Energy
    TI  - International Energy Outlook ${year} (Data Set)
    UR  - http://api.eia.gov/bulk/IEO${year}.zip
    DP  - http://api.eia.gov
    C2  - temporal: annual
    C3  - format: XML and JSON data API, JSON download file
    PY  - ${year}
    AD  - Washington, DC: Energy Information Administration, U.S. Department of Energy
    DB  - EIA Data Sets
    Y2  - ${new Date().toLocaleDateString('en-ZA')}
    LB  - IEO.${year}
    ST  - IEO.${year}
    AU  - US DOE,
    CY  - Washington, DC
    ER  -`
		)
	}
	createSteoRIS = () => {
		return (
			`TY  - DATA
    KW  - Short-Term Energy Outlook EIA Energy Information Administration short term forecast projection international production consumption trade electricity petroleum natural gas coal nuclear renewable hydroelectric
    PB  - Energy Information Administration, U.S. Department of Energy
    TI  - Short-Term Energy Outlook (Data Set)
    UR  - api.eia.gov/bulk/STEO.zip
    DP  - http://api.eia.gov
    C2  - temporal: monthly
    C3  - format: XML and JSON data API, JSON download file
    PY  - ${new Date().toLocaleDateString('en-ZA').slice(-4)}
    AD  - Washington, DC: Energy Information Administration, U.S. Department of Energy
    DB  - EIA Data Sets
    Y2  - ${new Date().toLocaleDateString('en-ZA')}
    AU  - US DOE,
    CY  - Washington, DC
    ER  -`
		)
	}
	createSedsRIS = () => {
		return (
			`TY  - DATA
    KW  - State Energy Data System SEDS EIA Energy Information Administration US production consumption prices expenditures GDP electricity petroleum natural gas coal nuclear renewable hydroelectric
    PB  - Energy Information Administration, U.S. Department of Energy
    TI  - State Energy Data System (SEDS)
    UR  - api.eia.gov/bulk/SEDS.zip
    DP  - http://api.eia.gov
    C2  - temporal: annual
    C3  - format: XML and JSON data API, JSON download file
    PY  - ${new Date().toLocaleDateString('en-ZA').slice(-4)}
    AD  - Washington, DC: Energy Information Administration, U.S. Department of Energy
    DB  - EIA Data Sets
    Y2  - ${new Date().toLocaleDateString('en-ZA')}
    AU  - US DOE,
    CY  - Washington, DC
    ER  -`
		)
	}
	createGeneralRIS = () => {
		return (
			`TY  - DATA
    KW  - EIA Energy Information Administration united states production consumption trade electricity petroleum natural gas coal nuclear renewable hydroelectric wind solar
    N1  - Currently, EIA's API contains the following main data sets: Hourly electricity operating data, including actual and forecast demand, net generation, and the power flowing between electric systems; 408,000 electricity series organized into 29,000 categories; 30,000 State Energy Data System series organized into 600 categories; 115,052 petroleum series and associated categories; 34,790 U.S. crude imports series and associated categories; 11,989 natural gas series and associated categories; 132,331 coal series and associated categories; 3,872 Short-Term Energy Outlook series and associated categories; 368,466 Annual Energy Outlook series and associated categories; 92,836 International energy series
    PB  - Energy Information Administration, U.S. Department of Energy
    TI  - EIA Open Data 
    UR  - http://api.eia.gov/bulk/
    DP  - http://api.eia.gov
    C2  - temporal: annual
    C2  - temporal: monthly
    C2  - temporal: quarterly
    C2  - temporal: hourly
    C3  - format: XML and JSON data API, JSON download file
    PY  - ${new Date().toLocaleDateString('en-ZA').slice(-4)}
    AD  - Washington, DC: Energy Information Administration, U.S. Department of Energy
    DB  - EIA Data Sets
    Y2  - ${new Date().toLocaleDateString('en-ZA')}
    AU  - US DOE,
    CY  - Washington, DC
    ER  -`
		)
	}
	createAEORIS = (title: string, year: string) => {
		return (
			`TY  - DATA
    KW  - Annual Energy Outlook AEO EIA Energy Information Administration long term forecast projection united states production consumption trade electricity petroleum natural gas coal nuclear renewable hydroelectric wind solar
    N1  - The Annual Energy Outlook (AEO) from EIA.gov provides long term forecasts (25 years) of U.S. energy production, consumption, and trade for the United Stated of electricity, petroleum, natural gas, coal, nuclear, and renewable sources.
    PB  - Energy Information Administration, U.S. Department of Energy
    TI  - ${title} (Data Set)
    UR  - http://api.eia.gov/bulk/AEO${year}.zip
    DP  - http://api.eia.gov
    C2  - temporal: annual
    C3  - format: XML and JSON data API, JSON download file
    PY  - ${year}
    AD  - Washington, DC: Energy Information Administration, U.S. Department of Energy
    DB  - EIA Data Sets
    Y2  - ${new Date().toLocaleDateString('en-ZA')}
    LB  - AEO.${year}
    ST  - AEO.${year}
    AU  - US DOE,
    CY  - Washington, DC
    ER  -`
		)
	}
}