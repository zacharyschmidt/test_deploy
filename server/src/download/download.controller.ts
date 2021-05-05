import { Controller, Get, Header, HttpCode, Query, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { CategoryService } from '../categories/category.service';
import { SeriesService } from '../series/series.service';
import { PaginationDto } from '../categories/dto/Pagination.dto';

import { createReadStream } from 'fs';
import * as Excel from 'exceljs';
const createAEORIS = (title: string, year: string) => {
    return (
        `TY  - DATA
KW  - Annual Energy Outlook AEO EIA Energy Information Administration long term forecast projection united states production consumption trade electricity petroleum natural gas coal nuclear renewable hydroelectric wind solar
N1  - The Annual Energy Outlook (AEO) from EIA.gov provides long term forecasts (25 years) of U.S. energy production, consumption, and trade for the United Stated of electricity, petroleum, natural gas, coal, nuclear, and renewable sources.
PB  - U.S. Energy Information Administration
A2  - U.S. Energy Information Administration
TI  - ${title} (Data Set)
UR  - http://api.eia.gov/bulk/AEO${year}.zip
DP  - http://api.eia.gov
C2  - temporal: annual
C3  - format: XML and JSON data API, JSON download file
PY  - ${year}
AD  - Washington, DC: Energy Information Administration, U.S. Department of Energy
DB  - EIA Data Sets
Y2  - 2020/12/1
LB  - AEO.${year}
ST  - AEO.${year}
AU  - US DOE,
CY  - Washington, DC
ER  -`
    )
}
@Controller('download')
export class DownloadController {
    constructor(private categoryService: CategoryService,
        private seriesService: SeriesService) { }


    @Get('RIS')
    @HttpCode(201)
    @Header('Content-Type', 'text/plain')
    @Header('Content-Disposition', 'attachment; filename=test.RIS')
    async getRISDownload(@Res() response: Response,
        @Query('category_ID') category_ID: number) {
        const cat = await this.categoryService.getCategorybyID(category_ID);
        console.log(cat)
        const year = cat.dataset_name.slice(22)
        if (cat.dataset_name.includes('Annual Energy Outlook')) {
            return response.send(createAEORIS(cat.dataset_name, year))
        }
        return 0
    }

    @Get('excel')
    @HttpCode(201)
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    @Header('Content-Disposition', 'attachment; filename=test.xlsx')
    async getExcelDownload(@Res() response: Response,
        @Query('category_ID') category_ID: number,
        @Query('custom_flag') custom_flag: string,
        @Query() paginationDto: PaginationDto) {

        console.log("IN GET EXCEL")
        let cat;
        if (custom_flag === 'EIA') {
            cat = await this.categoryService.getCategorybyID(category_ID);
        };

        //console.log(cat.childSeries)
        console.log(paginationDto)
        console.log(paginationDto.Frequency, paginationDto.Region)
        let series
        if (custom_flag === 'EIA') {
            series = await this.seriesService.getManySeries(cat.category_id,
                paginationDto.Frequency, paginationDto.Region);
        } else if (custom_flag === 'custom') {
            series = await this.seriesService.getCustomSeries(category_ID, paginationDto.Frequency,
                paginationDto.Region)
        }
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
        if (cat?.dataset_name && cat.dataset_name.includes('Annual Energy Outlook')) {
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
        let name = cat?.name ? cat.name : 'US Electricity GDP';

        let dataset_name = cat?.dataset_name ? cat.dataset_name : 'Custom';
        worksheet.getRow(1).values = ["Data Group:", name]
        worksheet.getRow(1).font = {size: 16}
        worksheet.getRow(2).values = ["Data Set Name (top level category):",  dataset_name]
        worksheet.getRow(2).font = {size: 16}
        worksheet.getRow(3).values = ["EIA API:", "https://www.eia.gov/opendata/"]
        worksheet.getRow(3).font = {size: 16}
        worksheet.getRow(6).font = {bold: true}

        worksheet.insertRows(7, new Array(9))

        worksheet.getRow(5).values = ["Calculated:"]
        worksheet.getRow(5).font = {size: 16}
        worksheet.getRow(15).values = ["Source Data:"]
        worksheet.getRow(15).font = {size: 16}

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
        worksheet.fillFormula('D7:BV7', 'D21')
        worksheet.fillFormula('D8:BV8', 'D22/1000')
        worksheet.fillFormula('D9:BV9', '(SUM(D17:D20) + SUM(D23:D26))/1000')
        worksheet.fillFormula('D10:BV10', 'D16')
        worksheet.fillFormula('D11:BV11', 'D8*1000/D7')
        worksheet.fillFormula('D12:BV12', 'D10/D7')
        worksheet.fillFormula('D13:BV13', 'D9*1000/D7')


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
        // .then(() => {
        //     response.status(200).end()
        // })
        // const xl = createReadStream('./src/test.xlsx')
        // response.send(xl)
    }

}

