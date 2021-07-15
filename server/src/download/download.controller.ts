import { Controller, Get, Header, HttpCode, Query, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { CategoryService } from '../categories/category.service';
import { SeriesService } from '../series/series.service';
import { DownloadService } from './download.service';
import { PaginationDto } from '../categories/dto/Pagination.dto';

import * as Excel from 'exceljs';


@Controller('download')
export class DownloadController {
    constructor(private categoryService: CategoryService,
        private seriesService: SeriesService,
        private downloadService: DownloadService) { }


    @Get('RIS')
    @HttpCode(201)
    @Header('Content-Type', 'text/plain')
    @Header('Content-Disposition', 'attachment; filename=test.RIS')
    async getRISDownload(@Res() response: Response,
        @Query('category_ID') category_ID: number) {
        const cat = await this.categoryService.getCategorybyID(category_ID);
        const year = cat.dataset_name.slice(22)
        if (cat.dataset_name.includes('Annual Energy Outlook')) {
            return response.send(this.downloadService.createAEORIS(cat.dataset_name, year))
        } else if (cat.dataset_name === 'State Energy Data System (SEDS)') {
            return response.send(this.downloadService.createSedsRIS());
        } else if (cat.dataset_name === 'International Energy Outlook') {
            return response.send(this.downloadService.createIEORIS(cat.ancestor_names))
        } else if (cat.dataset_name === 'Short-Term Energy Outlook') {
            return response.send(this.downloadService.createSteoRIS())
        }
        else {
            return response.send(this.downloadService.createGeneralRIS())
        }

    }

    @Get('excel')
    @HttpCode(201)
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    @Header('Content-Disposition', 'attachment; filename=test.xlsx')
    async getExcelDownload(@Res() response: Response,
        @Query('category_ID') category_ID: number,
        @Query('custom_flag') custom_flag: string,
        @Query() paginationDto: PaginationDto) {



        //console.log(cat.childSeries)
        console.log(paginationDto)
        console.log(paginationDto.Frequency, paginationDto.Region)

        if (custom_flag === 'custom') {
            let series = await this.seriesService.getManySeries(category_ID, paginationDto.Frequency,
                paginationDto.Region, custom_flag)

            console.log(series)
            let workbook = new Excel.Workbook()
            let worksheet = workbook.addWorksheet('data');
            console.log('before name_cols')
            let name_cols = [{ header: 'Name', key: 'name', width: 60 },
            { header: 'Region', key: 'region', width: 20 },
            { header: 'Units', key: 'units', width: 20 },]
            console.log('after name_cols')
            console.log(series[0])
            let year_data = series[0].data
            console.log(year_data)
            if (year_data[0][0] > year_data[1][0]) {
                year_data.reverse()
            }
            console.log('before year cols')
            let year_cols = year_data.map(year => {
                return { header: year[0], key: year[0], width: 10 }
            })

            let cols = [...name_cols, ...year_cols]
            console.log('before set worksheet cols')
            console.log(cols);
            worksheet.columns = cols; // I accidentally deleted this and it caused a problem
            let region = ''
            // if (cat?.dataset_name && cat.dataset_name.includes('Annual Energy Outlook')) {
            //     region = 'USA'
            // }
            console.log('before data_rows def')
            let data_rows = series.map(series => {
                console.log('in outer map')
                const data_array = series.data.map(year => {
                    return { [year[0]]: year[1] }
                })
                if (Number(Object.keys(data_array[0])[0]) > Number(Object.keys(data_array[0])[0])) {
                    data_array.reverse()
                }


                console.log('before data_object map')
                const data_object = Object.assign({}, ...(data_array.map(item =>
                    (item))));

                let return_obj = { name: series.name, region: region.length ? region : series.geography, units: series.units, ...data_object }
                console.log('defined return obj')
                return return_obj
            })
            //console.log(data_rows)
            console.log('before add rows')
            console.log(data_rows)
            // Add an array of rows
            // const rows = [
            //     //[5, 'Bob', new Date()], // row by array
            //     { id: 6, name: 'Barbara', dob: new Date() }
            // ];
            // add new rows and return them as array of row objects
            //const newRows = worksheet.addRows(rows);
            worksheet.addRows(data_rows)

            console.log('after add rows')

            worksheet.spliceRows(1, 0, ...new Array(5))
            let name = 'US Electricity GDP';

            let dataset_name = 'Custom';
            worksheet.getRow(1).values = ["Data Group:", name]
            worksheet.getRow(1).font = { size: 16 }
            worksheet.getRow(2).values = ["Data Set Name (top level category):", dataset_name]
            worksheet.getRow(2).font = { size: 16 }
            worksheet.getRow(3).values = ["EIA API:", "https://www.eia.gov/opendata/"]
            worksheet.getRow(3).font = { size: 16 }
            worksheet.getRow(6).font = { bold: true }

            worksheet.insertRows(7, new Array(9))

            worksheet.getRow(5).values = ["Calculated:"]
            worksheet.getRow(5).font = { size: 16 }
            worksheet.getRow(15).values = ["Source Data:"]
            worksheet.getRow(15).font = { size: 16 }

            worksheet.getCell('A7').value = "GDP"
            worksheet.getCell('A8').value = "Primary Energy"
            worksheet.getCell('A9').value = "Final Energy"
            worksheet.getCell('A10').value = "Electricity Use"
            worksheet.getCell('A11').value = "Primary E/GDP"
            worksheet.getCell('A12').value = "Electricity use/GDP"
            worksheet.getCell('A13').value = "Final E/GDP"

            worksheet.getCell('C7').value = "Billion chained (2012) dollars"
            worksheet.getCell('C8').value = "(Quadrillion Btu)"
            worksheet.getCell('C9').value = "(Quadrillion Btu)"
            worksheet.getCell('C10').value = "Million Kilowatthours"
            worksheet.getCell('C11').value = "Tbtu/B2012$"
            worksheet.getCell('C12').value = "M kWh/B2012$"
            worksheet.getCell('C13').value = "Tbtu/B2012$"
            // calculations
            // edit these to fill to the end of the array dynamically
            worksheet.fillFormula('D7:BW7', 'D21')
            worksheet.fillFormula('D8:BW8', 'D24/1000')
            worksheet.fillFormula('D9:BW9', '(SUM(D17:D20) + SUM(D25:D28))/1000')
            worksheet.fillFormula('D10:BW10', 'D16')
            worksheet.fillFormula('D11:BW11', 'D8*1000/D7')
            worksheet.fillFormula('D12:BW12', 'D10/D7')
            worksheet.fillFormula('D13:BW13', 'D9*1000/D7')

            worksheet.getRows(7, 9999).forEach((row) => {
                for (let i = 4; i < 1000; i++) {
                    row.getCell(i).alignment = { horizontal: 'right' }
                    row.getCell(i).numFmt = '0.00'
                }
            })
            // worksheet.getRows(1, 1000).forEach((row) => {
            //     for (let i = 1; i < 1000; i++) {
            //         row.getCell(i).font = {
            //             name: 'Times New Roman',
            //             size: 12,
            //         }

            //     }
            // })
            // res is a Stream object
            // response.setHeader(
            // "Content-Type",
            // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            // );
            // response.setHeader(
            // "Content-Disposition",
            // "attachment; filename=" + "test.xlsx"
            // );
            console.log(process.cwd())
            return workbook.xlsx.write(response)
        }
        else if (custom_flag === 'AEO2021') {
            let series = await this.seriesService.getAEO2021KayaSeriesRef(category_ID, paginationDto.Frequency,
                paginationDto.Region)
            let seriesLowCostRen = await this.seriesService.getAEO2021KayaSeriesLowCostRen(category_ID, paginationDto.Frequency,
                paginationDto.Region)

            console.log(series)
            let workbook = new Excel.Workbook()
            let worksheet = workbook.addWorksheet('ReferenceCase');
            console.log('before name_cols')
            let name_cols = [{ header: 'Name', key: 'name', width: 60 },
            { header: 'Region', key: 'region', width: 20 },
            { header: 'Units', key: 'units', width: 20 },]
            console.log('after name_cols')
            console.log(series[0])
            let year_data = series[0].data
            console.log(year_data)
            if (year_data[0][0] > year_data[1][0]) {
                year_data.reverse()
            }
            console.log('before year cols')
            let year_cols = year_data.map(year => {
                return { header: year[0], key: year[0], width: 10 }
            })

            let cols = [...name_cols, ...year_cols]
            console.log('before set worksheet cols')
            console.log(cols);
            worksheet.columns = cols; // I accidentally deleted this and it caused a problem
            let region = ''
            // if (cat?.dataset_name && cat.dataset_name.includes('Annual Energy Outlook')) {
            //     region = 'USA'
            // }
            console.log('before data_rows def')
            let data_rows = series.map(series => {
                console.log('in outer map')
                const data_array = series.data.map(year => {
                    return { [year[0]]: year[1] }
                })
                if (Number(Object.keys(data_array[0])[0]) > Number(Object.keys(data_array[0])[0])) {
                    data_array.reverse()
                }


                console.log('before data_object map')
                const data_object = Object.assign({}, ...(data_array.map(item =>
                    (item))));

                let return_obj = { name: series.name, region: region.length ? region : series.geography, units: series.units, ...data_object }
                console.log('defined return obj')
                return return_obj
            })
            //console.log(data_rows)
            console.log('before add rows')
            console.log(data_rows)
            // Add an array of rows
            // const rows = [
            //     //[5, 'Bob', new Date()], // row by array
            //     { id: 6, name: 'Barbara', dob: new Date() }
            // ];
            // add new rows and return them as array of row objects
            //const newRows = worksheet.addRows(rows);
            worksheet.addRows(data_rows)

            console.log('after add rows')

            worksheet.spliceRows(1, 0, ...new Array(5))
            let name = 'Annual Energy Outlook 2021, Reference Case';

            let dataset_name = 'Custom';
            worksheet.getRow(1).values = ["Data Group:", name]
            worksheet.getRow(1).font = { size: 16 }
            worksheet.getRow(2).values = ["Data Set Name (top level category):", dataset_name]
            worksheet.getRow(2).font = { size: 16 }
            worksheet.getRow(3).values = ["EIA API:", "https://www.eia.gov/opendata/"]
            worksheet.getRow(3).font = { size: 16 }
            worksheet.getRow(6).font = { bold: true }

            worksheet.insertRows(7, new Array(25))

            worksheet.getCell('D1').value = 'Methods for expanded Kaya decomposition: Koomey, Jonathan, Zachary Schmidt, Holmes Hummel, and John Weyant. 2019. "Inside the Black Box:  Understanding Key Drivers of Global Emission Scenarios." Environmental Modeling and Software. vol. 111, no. 1. January. pp. 268-281. [https://www.sciencedirect.com/science/article/pii/S1364815218300793]'

            worksheet.getRow(5).values = ["Calculated:"]
            worksheet.getRow(5).font = { size: 16 }
            worksheet.getRow(31).values = ["Source Data:"]
            worksheet.getRow(31).font = { size: 16 }
            worksheet.getCell('A7').value = "Population"
            worksheet.getCell('A8').value = "GDP"
            worksheet.getCell('A9').value = "Final Energy"
            worksheet.getCell('A10').value = "Primary Energy, Direct Equivalence (Captured Energy)"
            worksheet.getCell('A11').value = "Primary Energy, Substitution Method"
            worksheet.getCell('A12').value = "Primary Energy from Fossil Fuels"
            worksheet.getCell('A13').value = "Total Fossil Energy Carbon (TFC)"

            worksheet.getCell('A15').value = "GDP / person"
            worksheet.getCell('A16').value = "Final Energy / GDP"
            worksheet.getCell('A17').value = "Primary Energy (Direct Equivalence) / Final Energy"
            worksheet.getCell('A18').value = "Primary Energy (Substitution Method) / Final Energy"
            worksheet.getCell('A19').value = "Primary Energy (Direct Equivalence) / Primary Energy from Fossil Fuels"
            worksheet.getCell('A20').value = "Primary Energy (Substitution Method) / Primary Energy from Fossil Fuels"
            worksheet.getCell('A21').value = "Total Fossil Energy Carbon (TFC) / Primary Energy from Fossil Fuels"



            worksheet.getCell('A23').value = "Primary Energy (Direct Equivalence) / GDP"
            worksheet.getCell('A24').value = "Primary Energy (Substitution Method) / GDP"
            worksheet.getCell('A25').value = "TFC / Primary Energy (Direct Equivalence)"
            worksheet.getCell('A26').value = "TFC / Primary Energy (Substitution Method)"

            worksheet.getCell('A28').value = "Electricity Use"
            worksheet.getCell('A29').value = "Electricity use / GDP"

            worksheet.getCell('C7').value = "Million people"
            worksheet.getCell('C8').value = "Billion chained (2012) dollars"
            worksheet.getCell('C9').value = "(Quadrillion Btu)"
            worksheet.getCell('C10').value = "(Quadrillion Btu)"
            worksheet.getCell('C11').value = "(Quadrillion Btu)"
            worksheet.getCell('C12').value = "(Quadrillion Btu)"
            worksheet.getCell('C13').value = "Million Metric Tons of Carbon Dioxide"

            worksheet.getCell('C15').value = "$ / person"
            worksheet.getCell('C16').value = "Tbtu / B2012$"

            worksheet.getCell('C21').value = "Tons of CO2 / billion BTU"


            worksheet.getCell('C23').value = "Tbtu / B2012$"
            worksheet.getCell('C24').value = "Tbtu / B2012$"
            worksheet.getCell('C25').value = "Tons of CO2 / billion BTU"
            worksheet.getCell('C26').value = "Tons of CO2 / billion BTU"

            worksheet.getCell('C28').value = "Million Kilowatthours"
            worksheet.getCell('C29').value = "M kWh / B2012$"


            // calculations
            // edit these to fill to the end of the array dynamically
            worksheet.fillFormula('D7:AH7', 'D47')
            worksheet.fillFormula('D8:AH8', 'D53')
            worksheet.fillFormula('D9:AH9', 'D33')
            worksheet.fillFormula('D10:AH10', '(D42-(D45-D44-D46)+((D51-D50-D52)*D32/1000000)-D38+(D49*D32/1000000))')
            worksheet.fillFormula('D11:AH11', 'D42')
            worksheet.fillFormula('D12:AH12', 'D42-SUM(D34:D40)')
            worksheet.fillFormula('D13:AH13', 'D48')

            worksheet.fillFormula('D15:AH15', 'D8*1000/D7')
            worksheet.fillFormula('D16:AH16', 'D9*1000/D8')
            worksheet.fillFormula('D17:AH17', 'D10/D9')
            worksheet.fillFormula('D18:AH18', 'D11/D9')
            worksheet.fillFormula('D19:AH19', 'D10/D12')
            worksheet.fillFormula('D20:AH20', 'D11/D12')
            worksheet.fillFormula('D21:AH21', 'D13/D12')

            worksheet.fillFormula('D23:AH23', 'D10*1000/D8')
            worksheet.fillFormula('D24:AH24', 'D11*1000/D8')
            worksheet.fillFormula('D25:AH25', 'D13/D10')
            worksheet.fillFormula('D26:AH26', 'D13/D11')

            worksheet.fillFormula('D28:AH28', 'D43*1000')
            worksheet.fillFormula('D29:AH29', 'D28/D8')


            // for Low Renewable Cost Case

            worksheet = workbook.addWorksheet('LowRenewableCost');
            console.log('before name_cols')


            worksheet.columns = cols; // I accidentally deleted this and it caused a problem

            // if (cat?.dataset_name && cat.dataset_name.includes('Annual Energy Outlook')) {
            //     region = 'USA'
            // }

            data_rows = seriesLowCostRen.map(series => {
                console.log('in outer map')
                const data_array = series.data.map(year => {
                    return { [year[0]]: year[1] }
                })
                if (Number(Object.keys(data_array[0])[0]) > Number(Object.keys(data_array[0])[0])) {
                    data_array.reverse()
                }


                console.log('before data_object map')
                const data_object_low_cost = Object.assign({}, ...(data_array.map(item =>
                    (item))));

                let return_obj = { name: series.name, region: region.length ? region : series.geography, units: series.units, ...data_object_low_cost }
                console.log('defined return obj')
                return return_obj
            })
            //console.log(data_rows)
            console.log('before add rows')
            console.log(data_rows)
            // Add an array of rows
            // const rows = [
            //     //[5, 'Bob', new Date()], // row by array
            //     { id: 6, name: 'Barbara', dob: new Date() }
            // ];
            // add new rows and return them as array of row objects
            //const newRows = worksheet.addRows(rows);
            worksheet.addRows(data_rows)

            console.log('after add rows')

            worksheet.spliceRows(1, 0, ...new Array(5))
            name = 'Annual Energy Outlook 2021, Low Renewable Cost Case';

            dataset_name = 'Custom';
            worksheet.getRow(1).values = ["Data Group:", name]
            worksheet.getRow(1).font = { size: 16 }
            worksheet.getRow(2).values = ["Data Set Name (top level category):", dataset_name]
            worksheet.getRow(2).font = { size: 16 }
            worksheet.getRow(3).values = ["EIA API:", "https://www.eia.gov/opendata/"]
            worksheet.getRow(3).font = { size: 16 }
            worksheet.getRow(6).font = { bold: true }

            worksheet.insertRows(7, new Array(25))

            worksheet.getCell('D1').value = 'Methods for expanded Kaya decomposition: Koomey, Jonathan, Zachary Schmidt, Holmes Hummel, and John Weyant. 2019. "Inside the Black Box:  Understanding Key Drivers of Global Emission Scenarios." Environmental Modeling and Software. vol. 111, no. 1. January. pp. 268-281. [https://www.sciencedirect.com/science/article/pii/S1364815218300793]'

            worksheet.getRow(5).values = ["Calculated:"]
            worksheet.getRow(5).font = { size: 16 }
            worksheet.getRow(31).values = ["Source Data:"]
            worksheet.getRow(31).font = { size: 16 }
            worksheet.getCell('A7').value = "Population"
            worksheet.getCell('A8').value = "GDP"
            worksheet.getCell('A9').value = "Final Energy"
            worksheet.getCell('A10').value = "Primary Energy, Direct Equivalence (Captured Energy)"
            worksheet.getCell('A11').value = "Primary Energy, Substitution Method"
            worksheet.getCell('A12').value = "Primary Energy from Fossil Fuels"
            worksheet.getCell('A13').value = "Total Fossil Energy Carbon (TFC)"

            worksheet.getCell('A15').value = "GDP / person"
            worksheet.getCell('A16').value = "Final Energy / GDP"
            worksheet.getCell('A17').value = "Primary Energy (Direct Equivalence) / Final Energy"
            worksheet.getCell('A18').value = "Primary Energy (Substitution Method) / Final Energy"
            worksheet.getCell('A19').value = "Primary Energy (Direct Equivalence) / Primary Energy from Fossil Fuels"
            worksheet.getCell('A20').value = "Primary Energy (Substitution Method) / Primary Energy from Fossil Fuels"
            worksheet.getCell('A21').value = "Total Fossil Energy Carbon (TFC) / Primary Energy from Fossil Fuels"



            worksheet.getCell('A23').value = "Primary Energy (Direct Equivalence) / GDP"
            worksheet.getCell('A24').value = "Primary Energy (Substitution Method) / GDP"
            worksheet.getCell('A25').value = "TFC / Primary Energy (Direct Equivalence)"
            worksheet.getCell('A26').value = "TFC / Primary Energy (Substitution Method)"

            worksheet.getCell('A28').value = "Electricity Use"
            worksheet.getCell('A29').value = "Electricity use / GDP"

            worksheet.getCell('C7').value = "Million people"
            worksheet.getCell('C8').value = "Billion chained (2012) dollars"
            worksheet.getCell('C9').value = "(Quadrillion Btu)"
            worksheet.getCell('C10').value = "(Quadrillion Btu)"
            worksheet.getCell('C11').value = "(Quadrillion Btu)"
            worksheet.getCell('C12').value = "(Quadrillion Btu)"
            worksheet.getCell('C13').value = "Million Metric Tons of Carbon Dioxide"

            worksheet.getCell('C15').value = "$ / person"
            worksheet.getCell('C16').value = "Tbtu / B2012$"

            worksheet.getCell('C21').value = "Tons of CO2 / billion BTU"


            worksheet.getCell('C23').value = "Tbtu / B2012$"
            worksheet.getCell('C24').value = "Tbtu / B2012$"
            worksheet.getCell('C25').value = "Tons of CO2 / billion BTU"
            worksheet.getCell('C26').value = "Tons of CO2 / billion BTU"

            worksheet.getCell('C28').value = "Million Kilowatthours"
            worksheet.getCell('C29').value = "M kWh / B2012$"


            // calculations
            // edit these to fill to the end of the array dynamically
            worksheet.fillFormula('D7:AH7', 'D47')
            worksheet.fillFormula('D8:AH8', 'D53')
            worksheet.fillFormula('D9:AH9', 'D33')
            worksheet.fillFormula('D10:AH10', '(D42-(D45-D44-D46)+((D51-D50-D52)*D32/1000000)-D38+(D49*D32/1000000))')
            worksheet.fillFormula('D11:AH11', 'D42')
            worksheet.fillFormula('D12:AH12', 'D42-SUM(D34:D40)')
            worksheet.fillFormula('D13:AH13', 'D48')

            worksheet.fillFormula('D15:AH15', 'D8*1000/D7')
            worksheet.fillFormula('D16:AH16', 'D9*1000/D8')
            worksheet.fillFormula('D17:AH17', 'D10/D9')
            worksheet.fillFormula('D18:AH18', 'D11/D9')
            worksheet.fillFormula('D19:AH19', 'D10/D12')
            worksheet.fillFormula('D20:AH20', 'D11/D12')
            worksheet.fillFormula('D21:AH21', 'D13/D12')

            worksheet.fillFormula('D23:AH23', 'D10*1000/D8')
            worksheet.fillFormula('D24:AH24', 'D11*1000/D8')
            worksheet.fillFormula('D25:AH25', 'D13/D10')
            worksheet.fillFormula('D26:AH26', 'D13/D11')

            worksheet.fillFormula('D28:AH28', 'D43*1000')
            worksheet.fillFormula('D29:AH29', 'D28/D8')

            // worksheet.getRows(7, 9999).forEach((row) => {
            //     for (let i = 4; i < 1000; i++) {
            //         row.getCell(i).alignment = {horizontal: 'right'}
            //         row.getCell(i).numFmt = '0.00'
            //     }
            // })
            // worksheet.getRows(1, 1000).forEach((row) => {
            //     for (let i = 1; i < 1000; i++) {
            //         row.getCell(i).font = {
            //             name: 'Times New Roman',
            //             size: 12,
            //         }

            //     }
            // })


            // res is a Stream object
            // response.setHeader(
            // "Content-Type",
            // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            // );
            // response.setHeader(
            // "Content-Disposition",
            // "attachment; filename=" + "test.xlsx"
            // );
            console.log(process.cwd())
            return workbook.xlsx.write(response)
        }
        else if (custom_flag === 'kaya') {
            let series = await this.seriesService.getManySeries(category_ID, paginationDto.Frequency,
                paginationDto.Region, custom_flag)

            console.log(series)
            let workbook = new Excel.Workbook()
            let worksheet = workbook.addWorksheet('data');
            console.log('before name_cols')
            let name_cols = [{ header: 'Name', key: 'name', width: 60 },
            { header: 'Region', key: 'region', width: 20 },
            { header: 'Units', key: 'units', width: 20 },]
            console.log('after name_cols')
            console.log(series[0])
            let year_data = series[0].data
            console.log(year_data)
            if (year_data[0][0] > year_data[1][0]) {
                year_data.reverse()
            }
            console.log('before year cols')
            let year_cols = year_data.map(year => {
                return { header: year[0], key: year[0], width: 10 }
            })

            let cols = [...name_cols, ...year_cols]
            console.log('before set worksheet cols')
            console.log(cols);
            worksheet.columns = cols; // I accidentally deleted this and it caused a problem
            let region = ''
            // if (cat?.dataset_name && cat.dataset_name.includes('Annual Energy Outlook')) {
            //     region = 'USA'
            // }
            console.log('before data_rows def')
            let data_rows = series.map(series => {
                console.log('in outer map')
                const data_array = series.data.map(year => {
                    return { [year[0]]: year[1] }
                })
                if (Number(Object.keys(data_array[0])[0]) > Number(Object.keys(data_array[0])[0])) {
                    data_array.reverse()
                }


                console.log('before data_object map')
                const data_object = Object.assign({}, ...(data_array.map(item =>
                    (item))));

                let return_obj = { name: series.name, region: region.length ? region : series.geography, units: series.units, ...data_object }
                console.log('defined return obj')
                return return_obj
            })
            //console.log(data_rows)
            console.log('before add rows')
            console.log(data_rows)
            // Add an array of rows
            // const rows = [
            //     //[5, 'Bob', new Date()], // row by array
            //     { id: 6, name: 'Barbara', dob: new Date() }
            // ];
            // add new rows and return them as array of row objects
            //const newRows = worksheet.addRows(rows);
            worksheet.addRows(data_rows)

            console.log('after add rows')

            worksheet.spliceRows(1, 0, ...new Array(5))
            let name = 'Historical US Kaya Data';

            let dataset_name = 'Custom';
            worksheet.getRow(1).values = ["Data Group:", name]
            worksheet.getRow(1).font = { size: 16 }
            worksheet.getRow(2).values = ["Data Set Name (top level category):", dataset_name]
            worksheet.getRow(2).font = { size: 16 }
            worksheet.getRow(3).values = ["EIA API:", "https://www.eia.gov/opendata/"]
            worksheet.getRow(3).font = { size: 16 }
            worksheet.getRow(6).font = { bold: true }

            worksheet.insertRows(7, new Array(25))

            worksheet.getCell('D1').value = 'Methods for expanded Kaya decomposition: Koomey, Jonathan, Zachary Schmidt, Holmes Hummel, and John Weyant. 2019. "Inside the Black Box:  Understanding Key Drivers of Global Emission Scenarios." Environmental Modeling and Software. vol. 111, no. 1. January. pp. 268-281. [https://www.sciencedirect.com/science/article/pii/S1364815218300793]'

            worksheet.getRow(5).values = ["Calculated:"]
            worksheet.getRow(5).font = { size: 16 }
            worksheet.getRow(31).values = ["Source Data:"]
            worksheet.getRow(31).font = { size: 16 }
            worksheet.getCell('A7').value = "Population"
            worksheet.getCell('A8').value = "GDP"
            worksheet.getCell('A9').value = "Final Energy"
            worksheet.getCell('A10').value = "Primary Energy, Direct Equivalence (Captured Energy)"
            worksheet.getCell('A11').value = "Primary Energy, Substitution Method"
            worksheet.getCell('A12').value = "Primary Energy from Fossil Fuels"
            worksheet.getCell('A13').value = "Total Fossil Energy Carbon (TFC)"

            worksheet.getCell('A15').value = "GDP / person"
            worksheet.getCell('A16').value = "Final Energy / GDP"
            worksheet.getCell('A17').value = "Primary Energy (Direct Equivalence) / Final Energy"
            worksheet.getCell('A18').value = "Primary Energy (Substitution Method) / Final Energy"
            worksheet.getCell('A19').value = "Primary Energy (Direct Equivalence) / Primary Energy from Fossil Fuels"
            worksheet.getCell('A20').value = "Primary Energy (Substitution Method) / Primary Energy from Fossil Fuels"
            worksheet.getCell('A21').value = "Total Fossil Energy Carbon (TFC) / Primary Energy from Fossil Fuels"



            worksheet.getCell('A23').value = "Primary Energy (Direct Equivalence) / GDP"
            worksheet.getCell('A24').value = "Primary Energy (Substitution Method) / GDP"
            worksheet.getCell('A25').value = "TFC / Primary Energy (Direct Equivalence)"
            worksheet.getCell('A26').value = "TFC / Primary Energy (Substitution Method)"

            worksheet.getCell('A28').value = "Electricity Use"
            worksheet.getCell('A29').value = "Electricity use / GDP"

            worksheet.getCell('C7').value = "Million people"
            worksheet.getCell('C8').value = "Billion chained (2012) dollars"
            worksheet.getCell('C9').value = "(Quadrillion Btu)"
            worksheet.getCell('C10').value = "(Quadrillion Btu)"
            worksheet.getCell('C11').value = "(Quadrillion Btu)"
            worksheet.getCell('C12').value = "(Quadrillion Btu)"
            worksheet.getCell('C13').value = "Million Metric Tons of Carbon Dioxide"

            worksheet.getCell('C15').value = "$ / person"
            worksheet.getCell('C16').value = "Tbtu / B2012$"

            worksheet.getCell('C21').value = "Tons of CO2 / billion BTU"


            worksheet.getCell('C23').value = "Tbtu / B2012$"
            worksheet.getCell('C24').value = "Tbtu / B2012$"
            worksheet.getCell('C25').value = "Tons of CO2 / billion BTU"
            worksheet.getCell('C26').value = "Tons of CO2 / billion BTU"

            worksheet.getCell('C28').value = "Million Kilowatthours"
            worksheet.getCell('C29').value = "M kWh / B2012$"


            // calculations
            // edit these to fill to the end of the array dynamically
            worksheet.fillFormula('D7:BW7', 'D47')
            worksheet.fillFormula('D8:BW8', 'D39')
            worksheet.fillFormula('D9:BW9', '(SUM(D33:D36) + SUM(D50:D53))/1000')
            worksheet.fillFormula('D10:BW10', '(D47-D41+D40-D42+(D43*D37/10000000))/1000')
            worksheet.fillFormula('D11:BW11', 'D47/1000')
            worksheet.fillFormula('D12:BW12', 'D38/1000')
            worksheet.fillFormula('D13:BW13', 'D48')

            worksheet.fillFormula('D15:BW15', 'D8*1000/D7')
            worksheet.fillFormula('D16:BW16', 'D9*1000/D8')
            worksheet.fillFormula('D17:BW17', 'D10/D9')
            worksheet.fillFormula('D18:BW18', 'D11/D9')
            worksheet.fillFormula('D19:BW19', 'D10/D12')
            worksheet.fillFormula('D20:BW20', 'D11/D12')
            worksheet.fillFormula('D21:BW21', 'D13/D12')

            worksheet.fillFormula('D23:BW23', 'D10*1000/D8')
            worksheet.fillFormula('D24:BW24', 'D11*1000/D8')
            worksheet.fillFormula('D25:BW25', 'D13/D10')
            worksheet.fillFormula('D26:BW26', 'D13/D11')

            worksheet.fillFormula('D28:BW28', 'D32')
            worksheet.fillFormula('D29:BW29', 'D28/D8')

            // worksheet.getRows(7, 9999).forEach((row) => {
            //     for (let i = 4; i < 1000; i++) {
            //         row.getCell(i).alignment = {horizontal: 'right'}
            //         row.getCell(i).numFmt = '0.00'
            //     }
            // })
            // worksheet.getRows(1, 1000).forEach((row) => {
            //     for (let i = 1; i < 1000; i++) {
            //         row.getCell(i).font = {
            //             name: 'Times New Roman',
            //             size: 12,
            //         }

            //     }
            // })


            // res is a Stream object
            // response.setHeader(
            // "Content-Type",
            // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            // );
            // response.setHeader(
            // "Content-Disposition",
            // "attachment; filename=" + "test.xlsx"
            // );
            console.log(process.cwd())
            return workbook.xlsx.write(response)
        }
        else if (custom_flag === 'EIA') {

            const cat = await this.categoryService.getCategorybyID(category_ID);
            let series = await this.seriesService.getManySeries(cat.category_id,
                paginationDto.Frequency, paginationDto.Region, custom_flag);
            console.log('SERIES')
            series.sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                }
                return -1
            })
            console.log(series)
            let workbook = new Excel.Workbook()
            let worksheet = workbook.addWorksheet('data');
            console.log('before name_cols')
            let name_cols = [{ header: 'Name', key: 'name', width: 60 },
            { header: 'Region', key: 'region', width: 20 },
            { header: 'Units', key: 'units', width: 20 },]
            console.log('after name_cols')
            console.log(series[0])
            let year_data = series[0].data
            console.log(year_data)
            if (year_data[0][0] > year_data[1][0]) {
                year_data.reverse()
            }
            console.log('before year cols')
            let year_cols = year_data.map(year => {
                return { header: year[0], key: year[0], width: 10 }
            })

            let cols = [...name_cols, ...year_cols]
            console.log('before set worksheet cols')

            worksheet.columns = cols
            let region = ''
            if (cat.dataset_name.includes('Annual Energy Outlook')) {
                region = 'USA'
            }
            console.log('before data_rows def')
            let data_rows = series.map(series => {
                console.log('in outer map')
                const data_array = series.data.map(year => {
                    return { [year[0]]: year[1] }
                })
                if (Number(Object.keys(data_array[0])[0]) > Number(Object.keys(data_array[0])[0])) {
                    data_array.reverse()
                }


                console.log('before data_object map')
                const data_object = Object.assign({}, ...(data_array.map(item =>
                    (item))));
                console.log('after define data object')
                console.log(series.name)
                console.log(region)
                console.log(series.geography)
                console.log(region.length ? region : series.geography)
                console.log(series.units)
                let return_obj = { name: series.name, region: region.length ? region : series.geography, units: series.units, ...data_object }
                console.log('defined return obj')
                return return_obj
            })
            //console.log(data_rows)
            console.log('before add rows')
            worksheet.addRows(data_rows)
            console.log('after add rows')
            worksheet.spliceRows(1, 0, ...new Array(5))
            console.log(cat.name)
            console.log(cat.dataset_name)
            worksheet.getRow(1).values = ["Data Group:", cat.name]
            worksheet.getRow(1).font = { size: 16 }
            worksheet.getRow(2).values = ["Data Set Name (top level category):", cat.dataset_name]
            worksheet.getRow(2).font = { size: 16 }
            worksheet.getRow(3).values = ["EIA API:", "https://www.eia.gov/opendata/"]
            worksheet.getRow(3).font = { size: 16 }
            worksheet.getRow(6).font = { bold: true }
            // res is a Stream object
            // response.setHeader(
            // "Content-Type",
            // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            // );
            // response.setHeader(
            // "Content-Disposition",
            // "attachment; filename=" + "test.xlsx"
            // );

            //  worksheet.getRows(7, 100).forEach((row) => {
            //     for (let i = 4; i < 100; i++) {
            //         row.getCell(i).alignment = {horizontal: 'right'}
            //         row.getCell(i).numFmt = '0.00'
            //     }
            // })
            // worksheet.getRows(1, 100).forEach((row) => {
            //     for (let i = 1; i < 100; i++) {
            //         row.getCell(i).font = {
            //             name: 'Times New Roman',
            //             size: 12,
            //         }

            //     }
            // })
            console.log(process.cwd())
            return workbook.xlsx.write(response)

        }

        // .then(() => {
        //     response.status(200).end()
        // })
        // const xl = createReadStream('./src/test.xlsx')
        // response.send(xl)
    }
}

