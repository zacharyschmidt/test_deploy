export let oilProdConsumptionList = [
	// US consumption

	// GASOLINE


	'PET.MGFUPUS1.M',// finished motor gasoline
	'PET.MGAUPUS1.M',// finished aviation gasoline

	// JET FUEL
	'PET.MKJUPUS1.M', // kerosene-type jet fuel

	// DIESEL

	// Next fuels fall into 'diesel' category 
	// distillate fuel oil TOTAL
	'PET.MDIUPUS1.M',


	'PET.MD0UP_NUS_1.M',// Distillate Fuel Oil, 0 to 15 ppm

	'PET.MD1UP_NUS_1.M',// Distillate Fuel Oil, Greater than 15 to 500 ppm

	'PET.MDGUPUS1.M',// Distillate Fuel Oil, Greater Than 500 ppm Sulfur

	// petrochemical feedstocks
	//TOTAL
	'PET.MPCUP_NUS_1.M',

	'PET.MNFUPUS1.M',// Naphtha for Petrochemical Feedstock Use

	'PET.MOTUPUS1.M',// Other Oils for Petrochemical Feedstock Use

	// HYDROCARBON GAS LIQUIDS

	// Hydrocarbon gas liquids TOTAL
	'PET.MNGUPUS1.M',
	// Natural gas liquids SUBTOTAL
	'PET.M_EPL2_VPP_NUS_MBBL.M',

	'PET.M_EPLLEA_VPP_NUS_MBBL.M',// ethane

	'PET.M_EPLLPA_VPP_NUS_MBBL.M',// propane

	'PET.M_EPLLBAN_VPP_NUS_MBBL.M',// Normal Butane

	'PET.M_EPLLBAI_VPP_NUS_MBBL.M',// isobutane 

	'PET.M_EPLLNG_VPP_NUS_MBBL.M',// natural gasoline

	// Refinery Olefins SUBTOTAL
	'PET.M_EPLOLE_VPP_NUS_MBBL.M',

	'PET.M_EPLLEY_VPP_NUS_MBBL.M',// ethylene

	'PET.M_EPLLPY_VPP_NUS_MBBL.M',// propylene

	'PET.M_EPLLBYN_VPP_NUS_MBBL.M',// normal Butylene

	'PET.M_EPLLBYI_VPP_NUS_MBBL.M',// Isobutylene
	// pentanes plus SUBTOTAL
	'PET.MPPUPUS1.M',
	// Liquified Petroleum Gases SUBTOTAL
	'PET.MLPUPUS1.M',

	'PET.METUPUS1.M',// Ethane-Ethylene

	'PET.MPRUPUS1.M',// Propane and Propylene

	'PET.MBNUPUS1.M',// Normal Butane-Butylene

	'PET.MBIUPUS1.M',// Isobutane-Isobutylene
];

export let oilProdImportTotalList = [
	// TOTAL ALL PRODUCTS
	'PET.MTTIMUS1.M', //	U.S. Imports of Crude Oil and Petroleum Products (Thousand Barrels)
	// US CRUDE OIL IMPORTS
	// TOTAL
	'PET.MCRIMUS1.M',	// U.S. Imports of Crude Oil (Thousand Barrels)



	// DIESEL
	// TOTAL
	"PET.MDIIMUS1.M",//	U.S. Imports of Distillate Fuel Oil (Thousand Barrels)

	// US DIESAL IMPORTS 0 to 15 ppm Sulfur 
	// TOTAL DIESEL
	'PET.MD0IM_NUS-Z00_1.M', //	U.S. Imports of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	// DIESEL 15-500 SULFUR
	// TOTAL
	"PET.MD1IM_NUS-Z00_1.M",//	U.S. Imports of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	// DIESEL 500 SULFER
	// TOTAL
	"PET.MDGIMUS1.M",//	U.S. Imports of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)

	// US hydrocarbon gas Imports
	// TOTAL
	'PET.MNGIMUS1.M',	//	U.S. Imports of Hydrocarbon Gas Liquids (Thousand Barrels)

	// US Gasoline Imports
	// TOTAL
	'PET.MGFIMUS1.M', //	U.S. Imports of Finished Motor Gasoline (Thousand Barrels)


	// TOTAL JET FUEL
	'PET.MKJIMUS1.M', //	U.S. Imports of Kerosene-Type Jet Fuel (Thousand Barrels)
]

export let oilProdImportList = [
	// US CRUDE OIL IMPORTS

	// TOTAL
	'PET.MCRIMUS1.M',	// U.S. Imports of Crude Oil (Thousand Barrels)
	// PERSIAN GULF TOTAL
	'PET.MCRIMUSPG1.M',	// U.S. Imports from Persian Gulf Countries of Crude Oil (Thousand Barrels)
	// OPEC TOTAL
	'PET.MCRIMXX1.M',	// U.S. Imports from OPEC Countries of Crude Oil (Thousand Barrels)

	// COUNTRY DATA
	'PET.MCRIMUSAG1.M',	// U.S. Imports from Algeria of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSAO1.M',	// U.S. Imports from Angola of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSCF1.M',	// U.S. Imports from Congo (Brazzaville) of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NEK_1.M',	// U.S. Imports from Equatorial Guinea of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSGB1.M',	// U.S. Imports from Gabon of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NIR_1.M',	// U.S. Imports from Iran of Crude Oil (Thousand Barrels)
	'PET.MCRIMIZ1.M',	// U.S. Imports from Iraq of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSKU1.M',	// U.S. Imports from Kuwait of Crude Oil (Thousand Barrels)
	'PET.MCRIMLY1.M',	// U.S. Imports from Libya of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSNI1.M',	// U.S. Imports from Nigeria of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSSA1.M',	// U.S. Imports from Saudi Arabia of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSTC1.M',	// U.S. Imports from United Arab Emirates of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSVE1.M',	// U.S. Imports from Venezuela of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSVV1.M',	// U.S. Imports from Non-OPEC Countries of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NAL_1.M',	// U.S. Imports from Albania of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSAR1.M',	// U.S. Imports from Argentina of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSAS1.M',	// U.S. Imports from Australia of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NAJ_1.M',	// U.S. Imports from Azerbaijan of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NBF_1.M',	// U.S. Imports from Bahama Islands of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NBB_1.M',	// U.S. Imports from Barbados of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NBO_1.M',	// U.S. Imports from Belarus of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NBH_1.M',	// U.S. Imports from Belize of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NBN_1.M',	// U.S. Imports from Benin of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NBL_1.M',	// U.S. Imports from Bolivia of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSBR1.M',	// U.S. Imports from Brazil of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSBX1.M',	// U.S. Imports from Brunei of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSCM1.M',	// U.S. Imports from Cameroon of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSCA1.M',	// U.S. Imports from Canada of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NCD_1.M',	// U.S. Imports from Chad of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NCI_1.M',	// U.S. Imports from Chile of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSCH1.M',	// U.S. Imports from China of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSCO1.M',	// U.S. Imports from Colombia of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSCG1.M',	// U.S. Imports from Congo (Kinshasa) of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NDA_1.M',	// U.S. Imports from Denmark of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSEC1.M',	// U.S. Imports from Ecuador of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSEG1.M',	// U.S. Imports from Egypt of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NEN_1.M',	// U.S. Imports from Estonia of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NGG_1.M',	// U.S. Imports from Georgia of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NGM_1.M',	// U.S. Imports from Germany of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NGH_1.M',	// U.S. Imports from Ghana of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSGT1.M',	// U.S. Imports from Guatemala of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NGV_1.M',	// U.S. Imports from Guinea of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NGY_1.M',	// U.S. Imports from Guyana of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NIN_1.M',	// U.S. Imports from India of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSID1.M',	// U.S. Imports from Indonesia of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NIT_1.M',	// U.S. Imports from Italy of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NIV_1.M',	// U.S. Imports from Ivory Coast (Cote d'Ivore) of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NKZ_1.M',	// U.S. Imports from Kazakhstan of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NKG_1.M',	// U.S. Imports from Kyrgyzstan of Crude Oil (Thousand Barrels)
	'PET.MCRIMMY1.M',	// U.S. Imports from Malaysia of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NMR_1.M',	// U.S. Imports from Mauritania of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSMX1.M',	// U.S. Imports from Mexico of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSNL1.M',	// U.S. Imports from Netherlands of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NNA_1.M',	// U.S. Imports from Netherlands Antilles of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NNZ_1.M',	// U.S. Imports from New Zealand of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSNO1.M',	// U.S. Imports from Norway of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NMU_1.M',	// U.S. Imports from Oman of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NPM_1.M',	// U.S. Imports from Panama of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NPP_1.M',	// U.S. Imports from Papua New Guinea of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSPE1.M',	// U.S. Imports from Peru of Crude Oil (Thousand Barrels)
	'PET.MCRIMQA1.M',	// U.S. Imports from Qatar of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NRS_1.M',	// U.S. Imports from Russia of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSSN1.M',	// U.S. Imports from Singapore of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NSF_1.M',	// U.S. Imports from South Africa of Crude Oil (Thousand Barrels)
	'ESM_EPC0_IM0_NUS-NSS_MBBL.M',	// U.S. Imports from South Sudan of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSSP1.M',	// U.S. Imports from Spain of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSSW1.M',	// U.S. Imports from Sweden of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSSY1.M',	// U.S. Imports from Syria of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSTH1.M',	// U.S. Imports from Thailand of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSTD1.M',	// U.S. Imports from Trinidad and Tobago of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NTS_1.M',	// U.S. Imports from Tunisia of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSTU1.M',	// U.S. Imports from Turkey of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSUK1.M',	// U.S. Imports from United Kingdom of Crude Oil (Thousand Barrels)
	'PET.MCRIM_NUS-NVM_1.M',	// U.S. Imports from Vietnam of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSVQ1.M',	// U.S. Imports from Virgin Islands of Crude Oil (Thousand Barrels)
	'PET.MCRIMUSYE1.M',	// U.S. Imports from Yemen of Crude Oil (Thousand Barrels)


	// US hydrocarbon gas Imports

	// TOTAL
	'PET.MNGIMUS1.M',	//	U.S. Imports of Hydrocarbon Gas Liquids (Thousand Barrels)
	// PERSIAN GULF TOTAL
	'PET.MNGIM_NUS-MP0_1.M',	//	U.S. Imports from Persian Gulf Countries of Hydrocarbon Gas Liquids (Thousand Barrels)
	// OPEC TOTAL
	'PET.MNGIM_NUS-ME0_1.M',	//	U.S. Imports from OPEC Countries of Hydrocarbon Gas Liquids (Thousand Barrels)
	// COUNTRY DATA
	'PET.MNGIM_NUS-NAG_1.M',	//	U.S. Imports from Algeria of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NAO_1.M',	//	U.S. Imports from Angola of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NCF_1.M',	//	U.S. Imports from Congo (Brazzaville) of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NEK_1.M',	//	U.S. Imports from Equatorial Guinea of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NGB_MBBL.M',	//	U.S. Imports from Gabon of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NLY_1.M',	//	U.S. Imports from Libya of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NNI_1.M',	//	U.S. Imports from Nigeria of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NSA_1.M',	//	U.S. Imports from Saudi Arabia of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NTC_1.M',	//	U.S. Imports from United Arab Emirates of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NVE_1.M',	//	U.S. Imports from Venezuela of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-MN0_1.M',	//	U.S. Imports from Non-OPEC Countries of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NAR_1.M',	//	U.S. Imports from Argentina of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NAA_1.M',	//	U.S. Imports from Aruba of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NAS_1.M',	//	U.S. Imports from Australia of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NBO_1.M',	//	U.S. Imports from Belarus of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NBE_1.M',	//	U.S. Imports from Belgium of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NBR_1.M',	//	U.S. Imports from Brazil of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NCA_1.M',	//	U.S. Imports from Canada of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NCI_1.M',	//	U.S. Imports from Chile of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NCO_MBBL.M',	//	U.S. Imports from Colombia of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NDA_MBBL.M',	//	U.S. Imports from Denmark of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NDR_1.M',	//	U.S. Imports from Dominican Republic of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NFI_1.M',	//	U.S. Imports from Finland of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NFR_1.M',	//	U.S. Imports from France of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NGM_MBBL.M',	//	U.S. Imports from Germany of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NIT_1.M',	//	U.S. Imports from Italy of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NKZ_1.M',	//	U.S. Imports from Kazakhstan of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NKS_1.M',	//	U.S. Imports from Korea of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NMY_1.M',	//	U.S. Imports from Malaysia of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NMX_1.M',	//	U.S. Imports from Mexico of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NMQ_1.M',	//	U.S. Imports from Midway Islands of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NNL_1.M',	//	U.S. Imports from Netherlands of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NNA_1.M',	//	U.S. Imports from Netherlands Antilles of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NNO_1.M',	//	U.S. Imports from Norway of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NPE_1.M',	//	U.S. Imports from Peru of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NPO_1.M',	//	U.S. Imports from Portugal of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NQA_1.M',	//	U.S. Imports from Qatar of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NRS_1.M',	//	U.S. Imports from Russia of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NSN_1.M',	//	U.S. Imports from Singapore of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NSF_1.M',	//	U.S. Imports from South Africa of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NSP_1.M',	//	U.S. Imports from Spain of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NSW_1.M',	//	U.S. Imports from Sweden of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NSZ_MBBL.M',	//	U.S. Imports from Switzerland of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NTW_MBBL.M',	//	U.S. Imports from Taiwan of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NTD_1.M',	//	U.S. Imports from Trinidad and Tobago of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NTU_1.M',	//	U.S. Imports from Turkey of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.MNGIM_NUS-NUK_1.M',	//	U.S. Imports from United Kingdom of Hydrocarbon Gas Liquids (Thousand Barrels)
	'PET.M_EPL0_IM0_NUS-NVQ_1.M',	//	U.S. Imports from Virgin Islands of Hydrocarbon Gas Liquids (Thousand Barrels)

	// US Gasoline Imports

	// TOTAL
	'PET.MGFIMUS1.M', //	U.S. Imports of Finished Motor Gasoline (Thousand Barrels)
	// PERSIAN GULF TOTAL
	'PET.MGFIMUSPG1.M', //	U.S. Imports from Persian Gulf Countries of Finished Motor Gasoline (Thousand Barrels)
	// OPEC TOTAL
	'PET.MGFIM_NUS-ME0_1.M', //	U.S. Imports from OPEC Countries of Finished Motor Gasoline (Thousand Barrels)
	// COUNTRY DATA
	'PET.MGFIMUSAG1.M', //	U.S. Imports from Algeria of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NAO_1.M', //	U.S. Imports from Angola of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NCF_1.M', //	U.S. Imports from Congo (Brazzaville) of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NEK_1.M', //	U.S. Imports from Equatorial Guinea of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-wNGB_1.M', //	U.S. Imports from Gabon of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSNI1.M', //	U.S. Imports from Nigeria of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSSA1.M', //	U.S. Imports from Saudi Arabia of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSTC1.M', //	U.S. Imports from United Arab Emirates of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSVE1.M', //	U.S. Imports from Venezuela of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSVV1.M', //	U.S. Imports from Non-OPEC Countries of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSAR1.M', //	U.S. Imports from Argentina of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NAA_1.M', //	U.S. Imports from Aruba of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSAS1.M', //	U.S. Imports from Australia of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NAJ_1.M', //	U.S. Imports from Azerbaijan of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSBF1.M', //	U.S. Imports from Bahama Islands of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NBO_1.M', //	U.S. Imports from Belarus of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSBE1.M', //	U.S. Imports from Belgium of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSBR1.M', //	U.S. Imports from Brazil of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NBU_1.M', //	U.S. Imports from Bulgaria of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSCM1.M', //	U.S. Imports from Cameroon of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSCA1.M', //	U.S. Imports from Canada of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NCI_1.M', //	U.S. Imports from Chile of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSCH1.M', //	U.S. Imports from China of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSCO1.M', //	U.S. Imports from Colombia of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NHR_1.M', //	U.S. Imports from Croatia of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NDA_1.M', //	U.S. Imports from Denmark of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NEC_1.M', //	U.S. Imports from Ecuador of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSEG1.M', //	U.S. Imports from Egypt of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NEN_1.M', //	U.S. Imports from Estonia of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NWZ_1.M', //	U.S. Imports from Eswatini of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NFI_1.M', //	U.S. Imports from Finland of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSFR1.M', //	U.S. Imports from France of Finished Motor Gasoline (Thousand Barrels)

	'PET.MGFIMUSBZ1.M', //	U.S. Imports from Germany of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NGH_1.M', //	U.S. Imports from Ghana of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NGR_1.M', //	U.S. Imports from Greece of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NHU_1.M', //	U.S. Imports from Hungary of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NIN_1.M', //	U.S. Imports from India of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSID1.M', //	U.S. Imports from Indonesia of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NEI_1.M', //	U.S. Imports from Ireland of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NIS_1.M', //	U.S. Imports from Israel of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSIT1.M', //	U.S. Imports from Italy of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NIV_1.M', //	U.S. Imports from Ivory Coast (Cote d'Ivore) of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSJA1.M', //	U.S. Imports from Japan of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSKS1.M', //	U.S. Imports from Korea of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NKG_1.M', //	U.S. Imports from Kyrgyzstan of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NLG_1.M', //	U.S. Imports from Latvia of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NLH_1.M', //	U.S. Imports from Lithuania of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NMY_1.M', //	U.S. Imports from Malaysia of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NMT_1.M', //	U.S. Imports from Malta of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NMB_1.M', //	U.S. Imports from Martinique of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSMX1.M', //	U.S. Imports from Mexico of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NMQ_1.M', //	U.S. Imports from Midway Islands of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NMO_1.M', //	U.S. Imports from Morocco of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSNL1.M', //	U.S. Imports from Netherlands of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSNA1.M', //	U.S. Imports from Netherlands Antilles of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSNO1.M', //	U.S. Imports from Norway of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NPM_1.M', //	U.S. Imports from Panama of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSPE1.M', //	U.S. Imports from Peru of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NRP_1.M', //	U.S. Imports from Philippines of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NPL_1.M', //	U.S. Imports from Poland of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSPO1.M', //	U.S. Imports from Portugal of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSRQ1.M', //	U.S. Imports from Puerto Rico of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NQA_1.M', //	U.S. Imports from Qatar of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSRO1.M', //	U.S. Imports from Romania of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NRS_1.M', //	U.S. Imports from Russia of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NSG_1.M', //	U.S. Imports from Senegal of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSSN1.M', //	U.S. Imports from Singapore of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NSF_1.M', //	U.S. Imports from South Africa of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSSP1.M', //	U.S. Imports from Spain of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSSW1.M', //	U.S. Imports from Sweden of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NTW_1.M', //	U.S. Imports from Taiwan of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSTH1.M', //	U.S. Imports from Thailand of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NTO_1.M', //	U.S. Imports from Togo of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSTD1.M', //	U.S. Imports from Trinidad and Tobago of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NTS_1.M', //	U.S. Imports from Tunisia of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSTU1.M', //	U.S. Imports from Turkey of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NUR_1.M', //	U.S. Imports from Ukraine of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSUK1.M', //	U.S. Imports from United Kingdom of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIM_NUS-NUY_1.M', //	U.S. Imports from Uruguay of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGFIMUSVQ1.M', //	U.S. Imports from Virgin Islands of Finished Motor Gasoline (Thousand Barrels)

	// DIESEL
	// TOTAL
	"PET.MDIIMUS1.M",//	U.S. Imports of Distillate Fuel Oil (Thousand Barrels)
	// PERSIAN GULF
	"PET.MDIIMUSPG1.M",//	U.S. Imports from Persian Gulf Countries of Distillate Fuel Oil (Thousand Barrels)
	// OPEC
	"PET.MDIIM_NUS-ME0_1.M",//	U.S. Imports from OPEC Countries of Distillate Fuel Oil (Thousand Barrels)
	// COUNTRY DATA
	"PET.MDIIMUSAG1.M",//	U.S. Imports from Algeria of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSAO1.M",//	U.S. Imports from Angola of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSCF1.M",//	U.S. Imports from Congo (Brazzaville) of Distillate Fuel Oil (Thousand Barrels)
	"PET.M_EPD0_IM0_NUS-NEK_MBBL.M",//	U.S. Imports from Equatorial Guinea of Distillate Fuel Oil (Thousand Barrels)
	"PET.M_EPD0_IM0_NUS-NGB_MBBL.M",//	U.S. Imports from Gabon of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NKU_1.M",//	U.S. Imports from Kuwait of Distillate Fuel Oil (Thousand Barrels)
	"PET.M_EPD0_IM0_NUS-NLY_MBBL.M",//	U.S. Imports from Libya of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSNI1.M",//	U.S. Imports from Nigeria of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSSA1.M",//	U.S. Imports from Saudi Arabia of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSTC1.M",//	U.S. Imports from United Arab Emirates of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSVE1.M",//	U.S. Imports from Venezuela of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSVV1.M",//	U.S. Imports from Non-OPEC Countries of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSAR1.M",//	U.S. Imports from Argentina of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NAA_1.M",//	U.S. Imports from Aruba of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSAS1.M",//	U.S. Imports from Australia of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NAJ_1.M",//	U.S. Imports from Azerbaijan of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSBF1.M",//	U.S. Imports from Bahama Islands of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NBA_1.M",//	U.S. Imports from Bahrain of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NBO_1.M",//	U.S. Imports from Belarus of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSBE1.M",//	U.S. Imports from Belgium of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NBL_1.M",//	U.S. Imports from Bolivia of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSBR1.M",//	U.S. Imports from Brazil of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSCM1.M",//	U.S. Imports from Cameroon of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSCA1.M",//	U.S. Imports from Canada of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NCI_1.M",//	U.S. Imports from Chile of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NCH_1.M",//	U.S. Imports from China of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSCO1.M",//	U.S. Imports from Colombia of Distillate Fuel Oil (Thousand Barrels)
	"PET.M_EPD0_IM0_NUS-NCS_MBBL.M",//	U.S. Imports from Costa Rica of Distillate Fuel Oil (Thousand Barrels)
	"PET.M_EPD0_IM0_NUS-NUC_MBBL.M",//	U.S. Imports from Curacao of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NDA_1.M",//	U.S. Imports from Denmark of Distillate Fuel Oil (Thousand Barrels)
	"PET.M_EPD0_IM0_NUS-NEC_MBBL.M",//	U.S. Imports from Ecuador of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NEN_1.M",//	U.S. Imports from Estonia of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NFI_1.M",//	U.S. Imports from Finland of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSFR1.M",//	U.S. Imports from France of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NGG_1.M",//	U.S. Imports from Georgia of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSBZ1.M",//	U.S. Imports from Germany of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NGH_1.M",//	U.S. Imports from Ghana of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NGI_1.M",//	U.S. Imports from Gibraltar of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NGR_1.M",//	U.S. Imports from Greece of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NIN_1.M",//	U.S. Imports from India of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSID1.M",//	U.S. Imports from Indonesia of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NEI_1.M",//	U.S. Imports from Ireland of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NIS_1.M",//	U.S. Imports from Israel of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSIT1.M",//	U.S. Imports from Italy of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NIV_1.M",//	U.S. Imports from Ivory Coast (Cote d'Ivore) of Distillate Fuel Oil (Thousand Barrels)
	"PET.M_EPD0_IM0_NUS-NJM_MBBL.M",//	U.S. Imports from Jamaica of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSJA1.M",//	U.S. Imports from Japan of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NKZ_1.M",//	U.S. Imports from Kazakhstan of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSKS1.M",//	U.S. Imports from Korea of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NKG_1.M",//	U.S. Imports from Kyrgyzstan of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NLG_1.M",//	U.S. Imports from Latvia of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NLH_1.M",//	U.S. Imports from Lithuania of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NMY_1.M",//	U.S. Imports from Malaysia of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSMX1.M",//	U.S. Imports from Mexico of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NMO_1.M",//	U.S. Imports from Morocco of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSNL1.M",//	U.S. Imports from Netherlands of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSNA1.M",//	U.S. Imports from Netherlands Antilles of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NNE_1.M",//	U.S. Imports from Niue of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSNO1.M",//	U.S. Imports from Norway of Distillate Fuel Oil (Thousand Barrels)
	"PET.M_EPD0_IM0_NUS-NMU_MBBL.M",//	U.S. Imports from Oman of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NPM_1.M",//	U.S. Imports from Panama of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSPE1.M",//	U.S. Imports from Peru of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NRP_1.M",//	U.S. Imports from Philippines of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NPL_1.M",//	U.S. Imports from Poland of Distillate Fuel Oil (Thousand Barrels)
	"PET.M_EPD0_IM0_NUS-NPO_MBBL.M",//	U.S. Imports from Portugal of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NPZ_1.M",//	U.S. Imports from Puerto Rico of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NQA_1.M",//	U.S. Imports from Qatar of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSRO1.M",//	U.S. Imports from Romania of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NRS_1.M",//	U.S. Imports from Russia of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSSN1.M",//	U.S. Imports from Singapore of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSSP1.M",//	U.S. Imports from Spain of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSSW1.M",//	U.S. Imports from Sweden of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NSY_1.M",//	U.S. Imports from Syria of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NTW_1.M",//	U.S. Imports from Taiwan of Distillate Fuel Oil (Thousand Barrels)
	"PET.M_EPD0_IM0_NUS-NTH_MBBL.M",//	U.S. Imports from Thailand of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSTD1.M",//	U.S. Imports from Trinidad and Tobago of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NTS_1.M",//	U.S. Imports from Tunisia of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSTU1.M",//	U.S. Imports from Turkey of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NTX_1.M",//	U.S. Imports from Turkmenistan of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIM_NUS-NUR_1.M",//	U.S. Imports from Ukraine of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSUK1.M",//	U.S. Imports from United Kingdom of Distillate Fuel Oil (Thousand Barrels)
	"PET.MDIIMUSVQ1.M",//	U.S. Imports from Virgin Islands of Distillate Fuel Oil (Thousand Barrels)






	// US DIESAL IMPORTS 0 to 15 ppm Sulfur 
	// TOTAL DIESEL
	'PET.MD0IM_NUS-Z00_1.M', //	U.S. Imports of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	// PERSIAN GULF TOTAL
	'PET.MD0IM_NUS-MP0_1.M', //	U.S. Imports from Persian Gulf Countries of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	// OPEC TOTAL
	'PET.MD0IM_NUS-ME0_1.M', //	U.S. Imports from OPEC Countries of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	// COUNTRY DATA
	'PET.M_EPDXL0_IM0_NUS-NAG_MBBL.M', //	U.S. Imports from Algeria of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NEK_MBBL.M', //	U.S. Imports from Equatorial Guinea of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NGB_MBBL.M', //	U.S. Imports from Gabon of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NNI_MBBL.M', //	U.S. Imports from Nigeria of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NSA_MBBL.M', //	U.S. Imports from Saudi Arabia of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NTC_MBBL.M', //	U.S. Imports from United Arab Emirates of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NVE_1.M', //	U.S. Imports from Venezuela of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-MN0_1.M', //	U.S. Imports from Non-OPEC Countries of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NAR_1.M', //	U.S. Imports from Argentina of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NAA_1.M', //	U.S. Imports from Aruba of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NBF_1.M', //	U.S. Imports from Bahama Islands of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NBA_1.M', //	U.S. Imports from Bahrain of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NBO_1.M', //	U.S. Imports from Belarus of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NBE_1.M', //	U.S. Imports from Belgium of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NBR_MBBL.M', //	U.S. Imports from Brazil of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NCM_MBBL.M', //	U.S. Imports from Cameroon of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NCA_1.M', //	U.S. Imports from Canada of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NCI_MBBL.M', //	U.S. Imports from Chile of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NCH_1.M', //	U.S. Imports from China of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NCO_MBBL.M', //	U.S. Imports from Colombia of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NDA_1.M', //	U.S. Imports from Denmark of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NFI_MBBL.M', //	U.S. Imports from Finland of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NFR_MBBL.M', //	U.S. Imports from France of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NBZ_1.M', //	U.S. Imports from Germany of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NGR_1.M', //	U.S. Imports from Greece of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NIN_MBBL.M', //	U.S. Imports from India of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NID_1.M', //	U.S. Imports from Indonesia of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NIT_1.M', //	U.S. Imports from Italy of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NJA_1.M', //	U.S. Imports from Japan of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NKZ_1.M', //	U.S. Imports from Kazakhstan of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NKS_1.M', //	U.S. Imports from Korea of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NLG_MBBL.M', //	U.S. Imports from Latvia of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NLH_1.M', //	U.S. Imports from Lithuania of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NMY_1.M', //	U.S. Imports from Malaysia of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NMX_1.M', //	U.S. Imports from Mexico of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NNL_1.M', //	U.S. Imports from Netherlands of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NNA_1.M', //	U.S. Imports from Netherlands Antilles of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NNE_1.M', //	U.S. Imports from Niue of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NNO_1.M', //	U.S. Imports from Norway of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NMU_MBBL.M', //	U.S. Imports from Oman of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NPE_MBBL.M', //	U.S. Imports from Peru of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NPL_1.M', //	U.S. Imports from Poland of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NPO_MBBL.M', //	U.S. Imports from Portugal of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.M_EPDXL0_IM0_NUS-NQA_MBBL.M', //	U.S. Imports from Qatar of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NRS_1.M', //	U.S. Imports from Russia of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NSN_1.M', //	U.S. Imports from Singapore of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NSP_1.M', //	U.S. Imports from Spain of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NSW_1.M', //	U.S. Imports from Sweden of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NTW_1.M', //	U.S. Imports from Taiwan of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NTD_1.M', //	U.S. Imports from Trinidad and Tobago of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NUK_1.M', //	U.S. Imports from United Kingdom of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD0IM_NUS-NVQ_1.M', //	U.S. Imports from Virgin Islands of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)


	// DIESEL 15-500 SULFUR
	// TOTAL
	"PET.MD1IM_NUS-Z00_1.M",//	U.S. Imports of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	// PERSIAN GULF
	"PET.MD1IM_NUS-MP0_1.M",//	U.S. Imports from Persian Gulf Countries of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	// OPEC 
	"PET.MD1IM_NUS-ME0_1.M",//	U.S. Imports from OPEC Countries of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	// Country Data
	"PET.MD1IM_NUS-NAG_1.M",//	U.S. Imports from Algeria of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NKU_1.M",//	U.S. Imports from Kuwait of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPDM10_IM0_NUS-NLY_MBBL.M",//	U.S. Imports from Libya of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPDM10_IM0_NUS-NSA_MBBL.M",//	U.S. Imports from Saudi Arabia of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPDM10_IM0_NUS-NTC_MBBL.M",//	U.S. Imports from United Arab Emirates of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NVE_1.M",//	U.S. Imports from Venezuela of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-MN0_1.M",//	U.S. Imports from Non-OPEC Countries of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NAR_1.M",//	U.S. Imports from Argentina of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NAA_1.M",//	U.S. Imports from Aruba of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NAS_1.M",//	U.S. Imports from Australia of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NBF_1.M",//	U.S. Imports from Bahama Islands of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NBO_1.M",//	U.S. Imports from Belarus of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NBE_1.M",//	U.S. Imports from Belgium of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NBL_1.M",//	U.S. Imports from Bolivia of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPDM10_IM0_NUS-NBR_MBBL.M",//	U.S. Imports from Brazil of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NCA_1.M",//	U.S. Imports from Canada of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NCI_1.M",//	U.S. Imports from Chile of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPDM10_IM0_NUS-NCH_MBBL.M",//	U.S. Imports from China of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NCO_1.M",//	U.S. Imports from Colombia of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NDA_1.M",//	U.S. Imports from Denmark of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NEN_1.M",//	U.S. Imports from Estonia of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NFR_1.M",//	U.S. Imports from France of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NBZ_1.M",//	U.S. Imports from Germany of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NGI_1.M",//	U.S. Imports from Gibraltar of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPDM10_IM0_NUS-NIN_MBBL.M",//	U.S. Imports from India of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NID_1.M",//	U.S. Imports from Indonesia of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPDM10_IM0_NUS-NIT_MBBL.M",//	U.S. Imports from Italy of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NIV_1.M",//	U.S. Imports from Ivory Coast (Cote d'Ivore) of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NJA_1.M",//	U.S. Imports from Japan of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NKZ_1.M",//	U.S. Imports from Kazakhstan of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NKS_1.M",//	U.S. Imports from Korea of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NLG_1.M",//	U.S. Imports from Latvia of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NLH_1.M",//	U.S. Imports from Lithuania of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NMY_1.M",//	U.S. Imports from Malaysia of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NMX_1.M",//	U.S. Imports from Mexico of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NNL_1.M",//	U.S. Imports from Netherlands of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NNA_1.M",//	U.S. Imports from Netherlands Antilles of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NNO_1.M",//	U.S. Imports from Norway of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPDM10_IM0_NUS-NPE_MBBL.M",//	U.S. Imports from Peru of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NRP_1.M",//	U.S. Imports from Philippines of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NRS_1.M",//	U.S. Imports from Russia of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NSN_1.M",//	U.S. Imports from Singapore of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NSP_1.M",//	U.S. Imports from Spain of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NSW_1.M",//	U.S. Imports from Sweden of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NTW_1.M",//	U.S. Imports from Taiwan of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NUR_1.M",//	U.S. Imports from Ukraine of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NUK_1.M",//	U.S. Imports from United Kingdom of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	"PET.MD1IM_NUS-NVQ_1.M",//	U.S. Imports from Virgin Islands of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)


	// DIESEL 500 SULFER
	// TOTAL
	"PET.MDGIMUS1.M",//	U.S. Imports of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	// PERSIAN GULF
	"PET.MDGIM_NUS-MP0_1.M",//	U.S. Imports from Persian Gulf Countries of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	// OPEC
	"PET.MDGIM_NUS-ME0_1.M",//	U.S. Imports from OPEC Countries of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NAG_1.M",//	U.S. Imports from Algeria of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NCF_MBBL.M",//	U.S. Imports from Congo (Brazzaville) of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NGB_MBBL.M",//	U.S. Imports from Gabon of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NKU_MBBL.M",//	U.S. Imports from Kuwait of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NLY_MBBL.M",//	U.S. Imports from Libya of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NNI_MBBL.M",//	U.S. Imports from Nigeria of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NSA_1.M",//	U.S. Imports from Saudi Arabia of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NTC_MBBL.M",//	U.S. Imports from United Arab Emirates of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.MDGIM_NUS-NVE_1.M",//	U.S. Imports from Venezuela of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.MDGIM_NUS-MN0_1.M",//	U.S. Imports from Non-OPEC Countries of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.MDGIM_NUS-NAR_1.M",//	U.S. Imports from Argentina of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.MDGIM_NUS-NAA_1.M",//	U.S. Imports from Aruba of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NAJ_1.M",//	U.S. Imports from Azerbaijan of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NBF_MBBL.M",//	U.S. Imports from Bahama Islands of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NBO_1.M",//	U.S. Imports from Belarus of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NBE_1.M",//	U.S. Imports from Belgium of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NBR_MBBL.M",//	U.S. Imports from Brazil of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NCM_MBBL.M",//	U.S. Imports from Cameroon of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.MDGIM_NUS-NCA_1.M",//	U.S. Imports from Canada of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NCI_1.M",//	U.S. Imports from Chile of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NCO_MBBL.M",//	U.S. Imports from Colombia of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NCS_MBBL.M",//	U.S. Imports from Costa Rica of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NUC_MBBL.M",//	U.S. Imports from Curacao of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NDA_1.M",//	U.S. Imports from Denmark of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NEC_MBBL.M",//	U.S. Imports from Ecuador of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NEN_1.M",//	U.S. Imports from Estonia of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NFI_1.M",//	U.S. Imports from Finland of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NFR_1.M",//	U.S. Imports from France of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NGG_1.M",//	U.S. Imports from Georgia of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NGM_1.M",//	U.S. Imports from Germany of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NGR_MBBL.M",//	U.S. Imports from Greece of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.MDGIM_NUS-NIN_1.M",//	U.S. Imports from India of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NIT_MBBL.M",//	U.S. Imports from Italy of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NIV_1.M",//	U.S. Imports from Ivory Coast (Cote d'Ivore) of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NJM_MBBL.M",//	U.S. Imports from Jamaica of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NJA_1.M",//	U.S. Imports from Japan of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NKZ_1.M",//	U.S. Imports from Kazakhstan of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NKS_1.M",//	U.S. Imports from Korea of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NLG_1.M",//	U.S. Imports from Latvia of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NLH_1.M",//	U.S. Imports from Lithuania of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NMY_1.M",//	U.S. Imports from Malaysia of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NMX_MBBL.M",//	U.S. Imports from Mexico of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NNL_1.M",//	U.S. Imports from Netherlands of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.MDGIM_NUS-NNA_1.M",//	U.S. Imports from Netherlands Antilles of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NNO_MBBL.M",//	U.S. Imports from Norway of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NPE_MBBL.M",//	U.S. Imports from Peru of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NRP_1.M",//	U.S. Imports from Philippines of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NPO_MBBL.M",//	U.S. Imports from Portugal of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NPZ_1.M",//	U.S. Imports from Puerto Rico of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NQA_MBBL.M",//	U.S. Imports from Qatar of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.MDGIM_NUS-NRS_1.M",//	U.S. Imports from Russia of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NSN_1.M",//	U.S. Imports from Singapore of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NSP_1.M",//	U.S. Imports from Spain of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NSW_1.M",//	U.S. Imports from Sweden of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NSY_1.M",//	U.S. Imports from Syria of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NTW_1.M",//	U.S. Imports from Taiwan of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NTH_MBBL.M",//	U.S. Imports from Thailand of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.MDGIM_NUS-NTD_1.M",//	U.S. Imports from Trinidad and Tobago of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NTS_1.M",//	U.S. Imports from Tunisia of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NTU_MBBL.M",//	U.S. Imports from Turkey of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NTX_1.M",//	U.S. Imports from Turkmenistan of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NUR_1.M",//	U.S. Imports from Ukraine of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.M_EPD00H_IM0_NUS-NUK_1.M",//	U.S. Imports from United Kingdom of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)
	"PET.MDGIM_NUS-NVQ_1.M",//	U.S. Imports from Virgin Islands of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)


	// TOTAL JET FUEL
	'PET.MKJIMUS1.M', //	U.S. Imports of Kerosene-Type Jet Fuel (Thousand Barrels)
	// PERSIAN GULF JET FUEL
	'PET.MKJIM_NUS-MP0_1.M', //	U.S. Imports from Persian Gulf Countries of Kerosene-Type Jet Fuel (Thousand Barrels)
	// OPEC JET FUEL
	'PET.MKJIM_NUS-ME0_1.M', //	U.S. Imports from OPEC Countries of Kerosene-Type Jet Fuel (Thousand Barrels)
	// COUNTRY DATA
	'PET.MKJIM_NUS-NAG_1.M', //	U.S. Imports from Algeria of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NAO_MBBL.M', //	U.S. Imports from Angola of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NEK_MBBL.M', //	U.S. Imports from Equatorial Guinea of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NGB_MBBL.M', //	U.S. Imports from Gabon of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NIZ_1.M', //	U.S. Imports from Iraq of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NKU_1.M', //	U.S. Imports from Kuwait of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NLY_MBBL.M', //	U.S. Imports from Libya of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NNI_MBBL.M', //	U.S. Imports from Nigeria of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NSA_1.M', //	U.S. Imports from Saudi Arabia of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NTC_1.M', //	U.S. Imports from United Arab Emirates of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NVE_1.M', //	U.S. Imports from Venezuela of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-MN0_1.M', //	U.S. Imports from Non-OPEC Countries of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NAR_1.M', //	U.S. Imports from Argentina of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NAA_1.M', //	U.S. Imports from Aruba of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NBF_MBBL.M', //	U.S. Imports from Bahama Islands of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NBA_1.M', //	U.S. Imports from Bahrain of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NBO_1.M', //	U.S. Imports from Belarus of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NBE_1.M', //	U.S. Imports from Belgium of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NBR_1.M', //	U.S. Imports from Brazil of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NBX_MBBL.M', //	U.S. Imports from Brunei of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NCA_1.M', //	U.S. Imports from Canada of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NCD_MBBL.M', //	U.S. Imports from Chad of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NCH_1.M', //	U.S. Imports from China of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NCO_1.M', //	U.S. Imports from Colombia of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NUC_MBBL.M', //	U.S. Imports from Curacao of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NDA_MBBL.M', //	U.S. Imports from Denmark of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NEC_MBBL.M', //	U.S. Imports from Ecuador of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NEG_MBBL.M', //	U.S. Imports from Egypt of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NFI_MBBL.M', //	U.S. Imports from Finland of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NFR_1.M', //	U.S. Imports from France of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NGM_1.M', //	U.S. Imports from Germany of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NGT_MBBL.M', //	U.S. Imports from Guatemala of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NHK_MBBL.M', //	U.S. Imports from Hong Kong of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NIN_1.M', //	U.S. Imports from India of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NID_MBBL.M', //	U.S. Imports from Indonesia of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NIT_MBBL.M', //	U.S. Imports from Italy of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NJM_1.M', //	U.S. Imports from Jamaica of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NJA_1.M', //	U.S. Imports from Japan of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NKZ_1.M', //	U.S. Imports from Kazakhstan of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NKS_1.M', //	U.S. Imports from Korea of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NLI_1.M', //	U.S. Imports from Liberia of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NMY_1.M', //	U.S. Imports from Malaysia of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NMX_1.M', //	U.S. Imports from Mexico of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NNL_1.M', //	U.S. Imports from Netherlands of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NNA_1.M', //	U.S. Imports from Netherlands Antilles of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NNO_1.M', //	U.S. Imports from Norway of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NPM_MBBL.M', //	U.S. Imports from Panama of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NQA_1.M', //	U.S. Imports from Qatar of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NRS_1.M', //	U.S. Imports from Russia of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NSN_1.M', //	U.S. Imports from Singapore of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.M_EPJK_IM0_NUS-NSF_MBBL.M', //	U.S. Imports from South Africa of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NSZ_1.M', //	U.S. Imports from Switzerland of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NTW_1.M', //	U.S. Imports from Taiwan of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NTH_1.M', //	U.S. Imports from Thailand of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NTD_1.M', //	U.S. Imports from Trinidad and Tobago of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NUK_1.M', //	U.S. Imports from United Kingdom of Kerosene-Type Jet Fuel (Thousand Barrels)
	'PET.MKJIM_NUS-NVQ_1.M', //	U.S. Imports from Virgin Islands of Kerosene-Type Jet Fuel (Thousand Barrels)



	// TOTAL ALL PRODUCTS
	'PET.MTTIMUS1.M', //	U.S. Imports of Crude Oil and Petroleum Products (Thousand Barrels)
	// PERSIAN GULF ALL PRODUCTS
	'PET.MTTIMUSPG1.M', //	U.S. Imports from Persian Gulf Countries of Crude Oil and Petroleum Products (Thousand Barrels)
	// OPEC ALL PRODUCTS
	'PET.MTTIMXX1.M', //	U.S. Imports from OPEC Countries of Crude Oil and Petroleum Products (Thousand Barrels)
	// COUNTRY DATA
	'PET.MTTIMUSAG1.M', //	U.S. Imports from Algeria of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSAO1.M', //	U.S. Imports from Angola of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSCF1.M', //	U.S. Imports from Congo (Brazzaville) of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NEK_1.M', //	U.S. Imports from Equatorial Guinea of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSGB1.M', //	U.S. Imports from Gabon of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.M_EP00_IM0_NUS-NIR_MBBL.M', //	U.S. Imports from Iran of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMIZ1.M', //	U.S. Imports from Iraq of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSKU1.M', //	U.S. Imports from Kuwait of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMLY1.M', //	U.S. Imports from Libya of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSNI1.M', //	U.S. Imports from Nigeria of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSSA1.M', //	U.S. Imports from Saudi Arabia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSTC1.M', //	U.S. Imports from United Arab Emirates of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSVE1.M', //	U.S. Imports from Venezuela of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSVV1.M', //	U.S. Imports from Non-OPEC Countries of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NAL_1.M', //	U.S. Imports from Albania of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSAR1.M', //	U.S. Imports from Argentina of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NAA_1.M', //	U.S. Imports from Aruba of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSAS1.M', //	U.S. Imports from Australia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NAU_1.M', //	U.S. Imports from Austria of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NAJ_1.M', //	U.S. Imports from Azerbaijan of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSBF1.M', //	U.S. Imports from Bahama Islands of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NBA_1.M', //	U.S. Imports from Bahrain of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NBB_1.M', //	U.S. Imports from Barbados of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NBO_1.M', //	U.S. Imports from Belarus of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSBE1.M', //	U.S. Imports from Belgium of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NBH_1.M', //	U.S. Imports from Belize of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NBN_1.M', //	U.S. Imports from Benin of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NBL_1.M', //	U.S. Imports from Bolivia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NBK_1.M', //	U.S. Imports from Bosnia and Herzegovina of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSBR1.M', //	U.S. Imports from Brazil of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSBX1.M', //	U.S. Imports from Brunei of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NBU_1.M', //	U.S. Imports from Bulgaria of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NBM_1.M', //	U.S. Imports from Burma of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSCM1.M', //	U.S. Imports from Cameroon of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSCA1.M', //	U.S. Imports from Canada of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NCD_1.M', //	U.S. Imports from Chad of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NCI_1.M', //	U.S. Imports from Chile of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSCH1.M', //	U.S. Imports from China of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSCO1.M', //	U.S. Imports from Colombia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSCG1.M', //	U.S. Imports from Congo (Kinshasa) of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NCW_1.M', //	U.S. Imports from Cook Islands of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NCS_1.M', //	U.S. Imports from Costa Rica of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NHR_1.M', //	U.S. Imports from Croatia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.M_EP00_IM0_NUS-NUC_MBBL.M', //	U.S. Imports from Curacao of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NCY_1.M', //	U.S. Imports from Cyprus of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NCZ_1.M', //	U.S. Imports from Czech Republic of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NDA_1.M', //	U.S. Imports from Denmark of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NDR_1.M', //	U.S. Imports from Dominican Republic of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSEC1.M', //	U.S. Imports from Ecuador of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSEG1.M', //	U.S. Imports from Egypt of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NES_1.M', //	U.S. Imports from El Salvador of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NEN_1.M', //	U.S. Imports from Estonia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NWZ_1.M', //	U.S. Imports from Eswatini of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NFI_1.M', //	U.S. Imports from Finland of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSFR1.M', //	U.S. Imports from France of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NFG_1.M', //	U.S. Imports from French Guiana of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NGG_1.M', //	U.S. Imports from Georgia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSBZ1.M', //	U.S. Imports from Germany of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NGH_1.M', //	U.S. Imports from Ghana of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NGI_1.M', //	U.S. Imports from Gibraltar of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NGR_1.M', //	U.S. Imports from Greece of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSGT1.M', //	U.S. Imports from Guatemala of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NGV_1.M', //	U.S. Imports from Guinea of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NGY_1.M', //	U.S. Imports from Guyana of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NHK_1.M', //	U.S. Imports from Hong Kong of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NHU_1.M', //	U.S. Imports from Hungary of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NIN_1.M', //	U.S. Imports from India of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSID1.M', //	U.S. Imports from Indonesia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NEI_1.M', //	U.S. Imports from Ireland of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NIS_1.M', //	U.S. Imports from Israel of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSIT1.M', //	U.S. Imports from Italy of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NIV_1.M', //	U.S. Imports from Ivory Coast (Cote d'Ivore) of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NJM_1.M', //	U.S. Imports from Jamaica of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSJA1.M', //	U.S. Imports from Japan of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NJO_1.M', //	U.S. Imports from Jordan of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NKZ_1.M', //	U.S. Imports from Kazakhstan of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSKS1.M', //	U.S. Imports from Korea of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NKG_1.M', //	U.S. Imports from Kyrgyzstan of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NLG_1.M', //	U.S. Imports from Latvia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NLI_1.M', //	U.S. Imports from Liberia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NLH_1.M', //	U.S. Imports from Lithuania of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMMY1.M', //	U.S. Imports from Malaysia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NMT_1.M', //	U.S. Imports from Malta of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NMB_1.M', //	U.S. Imports from Martinique of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NMR_1.M', //	U.S. Imports from Mauritania of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSMX1.M', //	U.S. Imports from Mexico of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NMQ_1.M', //	U.S. Imports from Midway Islands of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NMO_1.M', //	U.S. Imports from Morocco of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NMZ_1.M', //	U.S. Imports from Mozambique of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NWA_1.M', //	U.S. Imports from Namibia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSNL1.M', //	U.S. Imports from Netherlands of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSNA1.M', //	U.S. Imports from Netherlands Antilles of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NNZ_1.M', //	U.S. Imports from New Zealand of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NNU_1.M', //	U.S. Imports from Nicaragua of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NNE_1.M', //	U.S. Imports from Niue of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSNO1.M', //	U.S. Imports from Norway of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NMU_1.M', //	U.S. Imports from Oman of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NPK_1.M', //	U.S. Imports from Pakistan of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NPM_1.M', //	U.S. Imports from Panama of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NPP_1.M', //	U.S. Imports from Papua New Guinea of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSPE1.M', //	U.S. Imports from Peru of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NRP_1.M', //	U.S. Imports from Philippines of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NPL_1.M', //	U.S. Imports from Poland of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSPO1.M', //	U.S. Imports from Portugal of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSRQ1.M', //	U.S. Imports from Puerto Rico of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMQA1.M', //	U.S. Imports from Qatar of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSRO1.M', //	U.S. Imports from Romania of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NRS_1.M', //	U.S. Imports from Russia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NSG_1.M', //	U.S. Imports from Senegal of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.M_EP00_IM0_NUS-NRB_1.M', //	U.S. Imports from Servia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.M_EP00_IM0_NUS-NRI_MBBL.M', //	U.S. Imports from Serbia (Excludes Kosovo) of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSSN1.M', //	U.S. Imports from Singapore of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NSK_1.M', //	U.S. Imports from Slovakia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NSF_1.M', //	U.S. Imports from South Africa of Crude Oil and Petroleum Products (Thousand Barrels)
	'ESM_EP00_IM0_NUS-NSS_MBBL.M', //	U.S. Imports from South Sudan of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSSP1.M', //	U.S. Imports from Spain of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NPG_1.M', //	U.S. Imports from Spratly Islands of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NCE_1.M', //	U.S. Imports from Sri Lanka of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NNS_1.M', //	U.S. Imports from Suriname of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSSW1.M', //	U.S. Imports from Sweden of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NSZ_1.M', //	U.S. Imports from Switzerland of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSSY1.M', //	U.S. Imports from Syria of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NTW_1.M', //	U.S. Imports from Taiwan of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSTH1.M', //	U.S. Imports from Thailand of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NTO_1.M', //	U.S. Imports from Togo of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSTD1.M', //	U.S. Imports from Trinidad and Tobago of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NTS_1.M', //	U.S. Imports from Tunisia of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSTU1.M', //	U.S. Imports from Turkey of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NTX_1.M', //	U.S. Imports from Turkmenistan of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NUR_1.M', //	U.S. Imports from Ukraine of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSUK1.M', //	U.S. Imports from United Kingdom of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NUY_1.M', //	U.S. Imports from Uruguay of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NUZ_1.M', //	U.S. Imports from Uzbekistan of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIM_NUS-NVM_1.M', //	U.S. Imports from Vietnam of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSVQ1.M', //	U.S. Imports from Virgin Islands of Crude Oil and Petroleum Products (Thousand Barrels)
	'PET.MTTIMUSYE1.M', //	U.S. Imports from Yemen of Crude Oil and Petroleum Products (Thousand Barrels)

];

export let oilProdExportList = [
	// GASOLINE
	'PET.MGFEXUS1.M', //	U.S. Exports of Finished Motor Gasoline (Thousand Barrels)
	'PET.MGAEXUS1.M', //	U.S. Exports of Aviation Gasoline (Thousand Barrels)
	// JET FUEL
	'PET.MKJEXUS1.M', //	U.S. Exports of Kerosene-Type Jet Fuel (Thousand Barrels)	

	// DIESAL
	// TOTAL
	'PET.MDIEXUS1.M', //	U.S. Exports of Distillate Fuel Oil (Thousand Barrels)

	'PET.M_EPDXL0_EEX_NUS-Z00_MBBL.M', //	U.S. Exports of Distillate Fuel Oil, 0 to 15 ppm Sulfur (Thousand Barrels)
	'PET.MD1EX_NUS-Z00_1.M', //	U.S. Exports of Distillate Fuel Oil, Greater than 15 to 500 ppm Sulfur (Thousand Barrels)
	'PET.MDGEXUS1.M', //	U.S. Exports of Distillate Fuel Oil, Greater Than 500 ppm Sulfur (Thousand Barrels)

	// PETROCHEMICAL FEEDSTOCKS
	'PET.MNFEXUS1.M', //	U.S. Exports of Naphtha for Petrochemical Feedstock Use (Thousand Barrels)
	'PET.MOTEXUS1.M', //	U.S. Exports of Other Oils for Petrochemical Feedstock Use (Thousand Barrels)];

	// TOTAL
	'PET.MNGEXUS1.M', //	U.S. Exports of Hydrocarbon Gas Liquids (Thousand Barrels)

	// NATURAL GAS LIQUIDS SUBTOTAL
	'PET.M_EPL2_EEX_NUS-Z00_MBBL.M', //	U.S. Exports to U.S. of Natural Gas Liquids (Thousand Barrels)

	'PET.M_EPLLEA_EEX_NUS-Z00_1.M', //	U.S. Exports of Ethane (Thousand Barrels)
	'PET.MPAEX_NUS-Z00_1.M', //	U.S. Exports of Propane (Thousand Barrels)
	'PET.MBUEX_NUS-Z00_1.M', //	U.S. Exports of Normal Butane (Thousand Barrels)
	'PET.M_EPLLBAI_EEX_NUS-Z00_1.M', //	U.S. Exports of Isobutane (Thousand Barrels)
	'PET.M_EPLLNG_EEX_NUS-Z00_MBBL.M', //	U.S. Exports of Natural Gasoline (Thousand Barrels)
	// PENTANES PLUS SUBTOTAL
	'PET.MPPEXUS1.M', //	U.S. Exports of Pentanes Plus (Thousand Barrels)
	// LIQUIFIED PETROLEUM GASES SUBTOTAL
	'PET.MLPEXUS1.M', //	U.S. Exports of Liquified Petroleum Gases (Thousand Barrels)

	'PET.METEXUS1.M', //	U.S. Exports of Ethane-Ethylene (Thousand Barrels)
	'PET.MPREXUS1.M', //	U.S. Exports of Propane and Propylene (Thousand Barrels)
	'PET.MBNEXUS1.M', //	U.S. Exports of Normal Butane-Butylene (Thousand Barrels)
	'PET.MBIEXUS1.M', //	U.S. Exports of Isobutane-Isobutylene (Thousand Barrels)




];