import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryService } from 'src/categories/category.service';
import { PaginationDto } from 'src/categories/dto/Pagination.dto';
import { SeriesService } from 'src/series/series.service';
import { oilProdConsumptionList, oilProdImportList, oilProdExportList, oilProdImportTotalList } from './utils/rmiSeries';

import * as Excel from 'exceljs';
import { reverse } from 'dns';

//inject a task queue here and create the excel sheet using th

// define class to generate excel sheet and inject into
// download controller. The controller will pass in the data.
@Injectable()
export class DownloadService {
  constructor(private categoryService: CategoryService,
    private seriesService: SeriesService,
  ) { }
  rmiExcel = async (category_ID: number, custom_flag: string, paginationDto: PaginationDto) => {
    let oilProdConsumption = await this.seriesService.getOilProdConsumption(oilProdConsumptionList)
    let oilProdImports = await this.seriesService.getOilProdImports(oilProdImportList)
    let oilProdExports = await this.seriesService.getOilProdExports(oilProdExportList)
    let oilProdImportTotals = await this.seriesService.getOilProdImportTotals(oilProdImportTotalList)

    let workbook = new Excel.Workbook()
    let worksheet = workbook.addWorksheet('Consumption');

    let data_rows = oilProdConsumption.map(series => {

      const data_array = series.data.map(year => {
        return { [year[0]]: year[1] }
      })
      if (Number(Object.keys(data_array[0])[0]) > Number(Object.keys(data_array[1])[0])) {
        console.log('Reversing Array')
        data_array.reverse()
      }

      // const data_object = Object.assign({}, ...(data_array.map(item =>
      //   (item))));

      let headersAndData = [...data_array]

      let return_obj = { name: series.name, series_id: series.series_id, region: series.geography, units: series.units, data: headersAndData }

      return return_obj;
    })
    //console.log(data_rows)
    console.log('before add rows')
    // sort the rows into the same order as the series_ids in the
    // array. This lets me control the order of the rows in the sheet.
    data_rows.sort((rowA, rowB) => {
      if (oilProdConsumptionList.findIndex((element) => element === rowA.series_id)
        > oilProdConsumptionList.findIndex((element) => element === rowB.series_id)) {
        return 1
      }
      return -1
    })




    worksheet.spliceRows(1, 0, [])


    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(5, 0, [])

    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(1, 0, [])




    // write row labels
    worksheet.getCell(6, 1).value = 'name';
    worksheet.getCell(7, 1).value = 'units';
    worksheet.getCell(8, 1).value = 'region';
    worksheet.getCell(9, 1).value = 'aggregation type (if any)'

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];


    data_rows[0].data.forEach((row, index) => {
      console.log(Number(Object.keys(row)[0]))
      console.log(Number(Object.keys(row)[0].slice(5, 6)))
      let monthIndex = Number(Object.keys(row)[0].slice(4, 6))
      let year = Number(Object.keys(row)[0].slice(0, 4))


      worksheet.getCell(index + 10, 1).value = `${monthIndex}/${year}`
    })
    // worksheet.getColumn(1).values = Object.keys(data_rows[0].data).reverse().map((rowLabel, index) => {
    //   if (index > 3) {
    //     return new Date(Number(rowLabel.slice(0, 4)), Number(rowLabel.slice(4, 6))).toString();
    //   }
    //   return rowLabel;
    // })


    // data_rows is an object of key value pairs representing a column.
    // insert values into columns below

    data_rows.forEach((dataRow, colIndex) => {
      // get values from the data object and start inserting into columns,
      worksheet.getCell(6, 2 + colIndex).value = dataRow.name;
      worksheet.getCell(7, 2 + colIndex).value = dataRow.units;
      worksheet.getCell(8, 2 + colIndex).value = dataRow.region;
      let column = dataRow.data.map((rowObj: { string: string }) => { return Object.values(rowObj)[0] })
      // starting from column 2  
      column.reverse().forEach((cell, rowIndex) => {
        // should get dynamic value for 917 because column will lengthen with updates
        worksheet.getCell(917 - rowIndex, 2 + colIndex).value = cell;
      })
    })





    worksheet.getCell('B5').value = 'Gasoline'
    worksheet.getCell('B5').font = { size: 16, bold: true }
    worksheet.mergeCells('B5:C5')
    worksheet.getCell('B5').alignment = { horizontal: 'left' }
    worksheet.getColumn(3).border = {
      right: { style: 'thin' }
    }

    worksheet.getCell('D5').value = 'Jet Fuel'
    worksheet.getCell('D5').font = { size: 16, bold: true }

    worksheet.getCell('D5').alignment = { horizontal: 'left' }
    worksheet.getColumn(4).border = {
      right: { style: 'thin' }
    }

    worksheet.spliceColumns(6, 0, [])
    worksheet.getCell('E5').value = 'Diesel'
    worksheet.getCell('E5').font = { size: 16, bold: true }
    worksheet.mergeCells('E5:I5')
    worksheet.getCell('E5').alignment = { horizontal: 'left' }
    worksheet.getColumn(9).border = {
      right: { style: 'thin' }
    }


    worksheet.getCell('E9').value = 'Total'
    worksheet.getCell('E9').font = { size: 14, bold: true }


    worksheet.getCell('F9').value = 'check total';
    worksheet.getCell('F9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    // need to figure out how to fill formula dynamically to match data series length
    worksheet.fillFormula('F10:F917', 'IF((COUNTBLANK(G10:I10)+COUNTBLANK(E10))>0, NA(), ROUND(SUM(G10:I10)-E10,-1))')

    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'F10:F917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['F10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['F10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )

    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'F9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(F10:F917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(F10:F917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )


    worksheet.spliceColumns(11, 0, [])
    worksheet.getCell('J5').value = 'Petrochemical Feedstocks'
    worksheet.getCell('J5').font = { size: 16, bold: true }
    worksheet.mergeCells('J5:M5')
    worksheet.getCell('J5').alignment = { horizontal: 'left' }
    worksheet.getColumn(13).border = {
      right: { style: 'thin' }
    }


    worksheet.getCell('J9').value = 'Total'
    worksheet.getCell('J9').font = { size: 14, bold: true }


    worksheet.getCell('K9').value = 'check total';
    worksheet.getCell('K9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.fillFormula('K10:K917', 'IF((COUNTBLANK(L10:M10)+COUNTBLANK(J10))>0, NA(), ROUND(SUM(L10:M10)-J10,-1))')

    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'K10:K917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['K10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['K10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'K9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(K10:K917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(K10:K917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )


    worksheet.spliceColumns(15, 0, [])
    worksheet.spliceColumns(15, 0, [])

    worksheet.getCell('N9').value = '(TOTAL) Sum of EITHER Natural Gas Liquids + Refinery Olefins OR Liquified Petroleum Gases + Pentanes Plus'
    worksheet.getCell('N9').font = { size: 14, bold: true }

    worksheet.getCell('O9').value = 'check (Natural Gas Liquids + Refinery Olefins)'
    worksheet.getCell('O9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.fillFormula('O10:O917', 'IF((COUNTBLANK(Q10)+COUNTBLANK(X10)+COUNTBLANK(N10))>0, NA(), ROUND((Q10+X10)-N10,-1))')
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'O10:O917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['O10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['O10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'O9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(O10:O917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(O10:O917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )

    worksheet.getCell('P9').value = 'check (Liquified Petroleum Gases + Pentanes Plus)'
    worksheet.getCell('P9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.fillFormula('P10:P917', 'IF((COUNTBLANK(AE10)+COUNTBLANK(AD10)+COUNTBLANK(N10))>0, NA(), ROUND((AE10+AD10)-N10,-1))')
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'P10:P917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['P10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['P10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'P9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(P10:P917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(P10:P917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )


    // subtotals
    worksheet.getCell('Q9').value = 'Subtotal'
    worksheet.getCell('Q9').font = { size: 14, bold: true }
    worksheet.spliceColumns(18, 0, [])
    worksheet.getCell('R9').value = 'check subtotal';
    worksheet.getCell('R9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.fillFormula('R10:R917', 'IF((COUNTBLANK(S10:W10)+COUNTBLANK(Q10))>0, NA(), ROUND(SUM(S10:W10)-Q10,-1))')
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'R10:R917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['R10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['R10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'R9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(R10:R917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(R10:R917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )

    worksheet.getColumn(23).border = {
      right: { style: 'thin' }
    }

    worksheet.getCell('X9').value = 'Subtotal'
    worksheet.getCell('X9').font = { size: 14, bold: true }
    worksheet.spliceColumns(25, 0, [])
    worksheet.getCell('Y9').value = 'check subtotal';
    worksheet.getCell('Y9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.fillFormula('Y10:Y917', 'IF((COUNTBLANK(Z10:AC10)+COUNTBLANK(X10))>0, NA(), ROUND(SUM(Z10:AC10)-X10,-1))')
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'Y10:Y917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['Y10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['Y10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'Y9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(Y10:Y917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(Y10:Y917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )



    worksheet.getCell('AD9').value = 'Subtotal'
    worksheet.getCell('AD9').font = { size: 14, bold: true }

    worksheet.getColumn(29).border = {
      right: { style: 'thin' }
    }

    worksheet.getColumn(30).border = {
      right: { style: 'thin' }
    }

    worksheet.getCell('AE9').value = 'Subtotal'
    worksheet.getCell('AE9').font = { size: 14, bold: true }
    worksheet.spliceColumns(32, 0, [])
    worksheet.getCell('AF9').value = 'check subtotal';
    worksheet.getCell('AF9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.fillFormula('AF10:AF917', 'IF((COUNTBLANK(AG10:AJ10)+COUNTBLANK(AE10))>0, NA(), ROUND(SUM(AG10:AJ10)-AE10,-1))')
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'AF10:AF917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['AF10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['AF10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'AF9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(AF10:AF917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(AF10:AF917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )

    worksheet.getCell('N5').value = 'Hydrocarbon Gas Liquids'
    worksheet.getCell('N5').font = { size: 16, bold: true }
    worksheet.mergeCells('N5:AJ5')
    worksheet.getCell('N5').alignment = { horizontal: 'left' }
    worksheet.getColumn(36).border = {
      right: { style: 'thin' }
    }

    // iterate over the cells and give each a bottom border,
    // making sure to copy the existing border cofiguration
    // to prevent loss of other borders
    worksheet.getRow(9).eachCell({ includeEmpty: true }, (cell) => {
      if (cell.border) {
        cell.border = {
          ...cell.border,
          bottom: { style: 'thin' }
        }
      } else {
        cell.border = { bottom: { style: 'thin' } }
      }
      console.log(cell.border)
    })

    let name = 'US Petroleum Product Consumption';

    let dataset_name = 'Custom';
    worksheet.getRow(1).values = ["Data Group:", name]
    worksheet.getRow(1).font = { size: 16 }
    worksheet.getRow(2).values = ["Data Set Name (top level category):", dataset_name]
    worksheet.getRow(2).font = { size: 16 }
    worksheet.getRow(3).values = ["EIA API:", "https://www.eia.gov/opendata/"]
    worksheet.getRow(3).font = { size: 16 }
    worksheet.getRow(6).font = { bold: true }

    // autosize columns
    worksheet.columns.forEach(function (column, i) {
      let maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        let columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    })

    worksheet.views = [
      { state: 'frozen', xSplit: 1, ySplit: 9, topLeftCell: 'B10', activeCell: 'A1' }
    ];

    // Imports

    worksheet = workbook.addWorksheet('Imports');



    //worksheet.columns = cols; // I accidentally deleted this and it caused a problem

    // if (cat?.dataset_name && cat.dataset_name.includes('Annual Energy Outlook')) {
    //     region = 'USA'
    // }

    data_rows = oilProdImports.map(series => {

      const data_array = series.data.map(year => {
        return { [year[0]]: year[1] }
      })
      if (Number(Object.keys(data_array[0])[0]) > Number(Object.keys(data_array[0])[0])) {
        data_array.reverse()
      }



      const data_object_imports = Object.assign({}, ...(data_array.map(item =>
        (item))));

      let return_obj = { name: series.name, series_id: series.series_id, region: series.geography, units: series.units, ...data_object_imports }

      return return_obj
    })
    //console.log(data_rows)

    data_rows.sort((rowA, rowB) => {
      if (oilProdImportList.findIndex((element) => element === rowA.series_id)
        > oilProdImportList.findIndex((element) => element === rowB.series_id)) {
        return 1
      }
      return -1
    })

    worksheet.addRows(data_rows)



    worksheet.spliceRows(1, 0, ...new Array(5))
    name = 'US Petroleum Product Imports';

    dataset_name = 'Custom';
    worksheet.getRow(1).values = ["Data Group:", name]
    worksheet.getRow(1).font = { size: 16 }
    worksheet.getRow(2).values = ["Data Set Name (top level category):", dataset_name]
    worksheet.getRow(2).font = { size: 16 }
    worksheet.getRow(3).values = ["EIA API:", "https://www.eia.gov/opendata/"]
    worksheet.getRow(3).font = { size: 16 }
    worksheet.getRow(6).font = { bold: true }



    // exports

    worksheet = workbook.addWorksheet('Exports');

    data_rows = oilProdExports.map(series => {

      const data_array = series.data.map(year => {
        return { [year[0]]: year[1] }
      })
      if (Number(Object.keys(data_array[0])[0]) > Number(Object.keys(data_array[1])[0])) {
        console.log('Reversing Array')
        data_array.reverse()
      }

      // const data_object = Object.assign({}, ...(data_array.map(item =>
      //   (item))));

      let headersAndData = [...data_array]

      let return_obj = { name: series.name, series_id: series.series_id, region: series.geography, units: series.units, data: headersAndData }

      return return_obj;
    })
    //console.log(data_rows)

    // sort the rows into the same order as the series_ids in the
    // array. This lets me control the order of the rows in the sheet.
    data_rows.sort((rowA, rowB) => {
      if (oilProdExportList.findIndex((element) => element === rowA.series_id)
        > oilProdExportList.findIndex((element) => element === rowB.series_id)) {
        return 1
      }
      return -1
    })




    worksheet.spliceRows(1, 0, [])


    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(5, 0, [])

    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(1, 0, [])




    // write row labels
    worksheet.getCell(6, 1).value = 'name';
    worksheet.getCell(7, 1).value = 'units';
    worksheet.getCell(8, 1).value = 'region';
    worksheet.getCell(9, 1).value = 'aggregation type (if any)'




    data_rows[0].data.forEach((row, index) => {
      console.log(Number(Object.keys(row)[0]))
      console.log(Number(Object.keys(row)[0].slice(5, 6)))
      let monthIndex = Number(Object.keys(row)[0].slice(4, 6))
      let year = Number(Object.keys(row)[0].slice(0, 4))


      worksheet.getCell(index + 10, 1).value = `${monthIndex}/${year}`
    })
    // worksheet.getColumn(1).values = Object.keys(data_rows[0].data).reverse().map((rowLabel, index) => {
    //   if (index > 3) {
    //     return new Date(Number(rowLabel.slice(0, 4)), Number(rowLabel.slice(4, 6))).toString();
    //   }
    //   return rowLabel;
    // })


    // data_rows is an object of key value pairs representing a column.
    // insert values into columns below

    console.log('export data')
    data_rows.forEach((dataRow, colIndex) => {
      // get values from the data object and start inserting into columns,
      worksheet.getCell(6, 2 + colIndex).value = dataRow.name;
      worksheet.getCell(7, 2 + colIndex).value = dataRow.units;
      worksheet.getCell(8, 2 + colIndex).value = dataRow.region;
      let column = dataRow.data.map((rowObj: { string: string }) => { return Object.values(rowObj)[0] })
      // starting from column 2  
      column.reverse().forEach((cell, rowIndex) => {
        // should get dynamic value for 917 because column will lengthen with updates
        worksheet.getCell(917 - rowIndex, 2 + colIndex).value = cell;
      })
    })





    worksheet.getCell('B5').value = 'Gasoline'
    worksheet.getCell('B5').font = { size: 16, bold: true }
    worksheet.mergeCells('B5:C5')
    worksheet.getCell('B5').alignment = { horizontal: 'left' }
    worksheet.getColumn(3).border = {
      right: { style: 'thin' }
    }

    worksheet.getCell('D5').value = 'Jet Fuel'
    worksheet.getCell('D5').font = { size: 16, bold: true }

    worksheet.getCell('D5').alignment = { horizontal: 'left' }
    worksheet.getColumn(4).border = {
      right: { style: 'thin' }
    }

    worksheet.spliceColumns(6, 0, [])
    worksheet.getCell('E5').value = 'Diesel'
    worksheet.getCell('E5').font = { size: 16, bold: true }
    worksheet.mergeCells('E5:I5')
    worksheet.getCell('E5').alignment = { horizontal: 'left' }
    worksheet.getColumn(9).border = {
      right: { style: 'thin' }
    }


    worksheet.getCell('E9').value = 'Total'
    worksheet.getCell('E9').font = { size: 14, bold: true }


    worksheet.getCell('F9').value = 'check total';
    worksheet.getCell('F9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    // need to figure out how to fill formula dynamically to match data series length
    worksheet.fillFormula('F10:F917', 'IF((COUNTBLANK(G10:I10)+COUNTBLANK(E10))>0, NA(), ROUND(SUM(G10:I10)-E10,-1))')

    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'F10:F917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['F10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['F10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )

    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'F9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(F10:F917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(F10:F917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )

    worksheet.getCell('J5').value = 'Petrochemical Feedstocks'
    worksheet.getCell('J5').font = { size: 16, bold: true }
    worksheet.mergeCells('J5:K5')
    worksheet.getCell('J5').alignment = { horizontal: 'left' }
    worksheet.getColumn(11).border = {
      right: { style: 'thin' }
    }

    worksheet.spliceColumns(13, 0, [])
    worksheet.spliceColumns(13, 0, [])

    worksheet.getCell('L9').value = '(TOTAL) Sum of EITHER Natural Gas Liquids + Refinery Olefins OR Liquified Petroleum Gases + Pentanes Plus'
    worksheet.getCell('L9').font = { size: 14, bold: true }

    worksheet.getCell('M9').value = 'check (Natural Gas Liquids + Refinery Olefins)'
    worksheet.getCell('M9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.fillFormula('M10:M917', 'IF((COUNTBLANK(O10)+COUNTBLANK(W10)+COUNTBLANK(L10))>0, NA(), ROUND((O10+W10)-L10,-1))')
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'M10:M917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['M10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['M10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'M9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(M10:M917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(M10:M917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )

    worksheet.getCell('N9').value = 'check (Liquified Petroleum Gases + Pentanes Plus)'
    worksheet.getCell('N9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.fillFormula('N10:N917', 'IF((COUNTBLANK(V10)+COUNTBLANK(W10)+COUNTBLANK(L10))>0, NA(), ROUND((V10+W10)-L10,-1))')
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'N10:N917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['N10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['N10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'N9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(N10:N917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(N10:N917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )


    // subtotals
    worksheet.getCell('O9').value = 'Subtotal'
    worksheet.getCell('O9').font = { size: 14, bold: true }
    worksheet.spliceColumns(16, 0, [])
    worksheet.getCell('P9').value = 'check subtotal';
    worksheet.getCell('P9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.fillFormula('P10:P917', 'IF((COUNTBLANK(Q10:U10)+COUNTBLANK(O10))>0, NA(), ROUND(SUM(Q10:U10)-O10,-1))')
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'P10:P917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['P10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['P10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )
    console.log('980')
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'P9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(P10:P917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(P10:P917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )

    worksheet.getColumn(21).border = {
      right: { style: 'thin' }
    }
    worksheet.getColumn(22).border = {
      right: { style: 'thin' }
    }

    worksheet.getCell('W9').value = 'Subtotal'
    worksheet.getCell('W9').font = { size: 14, bold: true }
    worksheet.spliceColumns(24, 0, [])
    worksheet.getCell('X9').value = 'check subtotal';
    worksheet.getCell('X9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    worksheet.fillFormula('X10:X917', 'IF((COUNTBLANK(Y10:AB10)+COUNTBLANK(W10))>0, NA(), ROUND(SUM(Y10:AB10)-W10,-1))')
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'X10:X917',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['X10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['X10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )
    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'X9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(X10:X917,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(X10:X917,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )


    worksheet.getCell('L5').value = 'Hydrocarbon Gas Liquids'
    worksheet.getCell('L5').font = { size: 16, bold: true }
    // M5 is already merged into a block with J5
    // look at output sheet 70 to get everything aligned correctly.
    worksheet.mergeCells('L5:AB5')
    worksheet.getCell('L5').alignment = { horizontal: 'left' }
    worksheet.getColumn(35).border = {
      right: { style: 'thin' }
    }
    console.log('1128')
    // iterate over the cells and give each a bottom border,
    // making sure to copy the existing border cofiguration
    // to prevent loss of other borders
    worksheet.getRow(9).eachCell({ includeEmpty: true }, (cell) => {
      if (cell.border) {
        cell.border = {
          ...cell.border,
          bottom: { style: 'thin' }
        }
      } else {
        cell.border = { bottom: { style: 'thin' } }
      }
      console.log(cell.border)
    })

    name = 'US Petroleum Product Exports';

    dataset_name = 'Custom';
    worksheet.getRow(1).values = ["Data Group:", name]
    worksheet.getRow(1).font = { size: 16 }
    worksheet.getRow(2).values = ["Data Set Name (top level category):", dataset_name]
    worksheet.getRow(2).font = { size: 16 }
    worksheet.getRow(3).values = ["EIA API:", "https://www.eia.gov/opendata/"]
    worksheet.getRow(3).font = { size: 16 }
    worksheet.getRow(6).font = { bold: true }
    console.log('1154')

    // autosize columns
    worksheet.columns.forEach(function (column, i) {
      let maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        let columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    })

    console.log('1166')

    worksheet.views = [
      { state: 'frozen', xSplit: 1, ySplit: 9, topLeftCell: 'B10', activeCell: 'A1' }
    ];


    // Import totals

    worksheet = workbook.addWorksheet('ImportTotals');

    data_rows = oilProdImportTotals.map(series => {

      const data_array = series.data.map(year => {
        return { [year[0]]: year[1] }
      })
      if (Number(Object.keys(data_array[0])[0]) > Number(Object.keys(data_array[1])[0])) {
        console.log('Reversing Array')
        data_array.reverse()
      }

      // const data_object = Object.assign({}, ...(data_array.map(item =>
      //   (item))));

      let headersAndData = [...data_array]

      let return_obj = { name: series.name, series_id: series.series_id, region: series.geography, units: series.units, data: headersAndData }

      return return_obj;
    })
    //console.log(data_rows)

    // sort the rows into the same order as the series_ids in the
    // array. This lets me control the order of the rows in the sheet.
    data_rows.sort((rowA, rowB) => {
      if (oilProdImportTotalList.findIndex((element) => element === rowA.series_id)
        > oilProdImportTotalList.findIndex((element) => element === rowB.series_id)) {
        return 1
      }
      return -1
    })




    worksheet.spliceRows(1, 0, [])


    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(5, 0, [])

    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(1, 0, [])
    worksheet.spliceRows(1, 0, [])




    // write row labels
    worksheet.getCell(6, 1).value = 'name';
    worksheet.getCell(7, 1).value = 'units';
    worksheet.getCell(8, 1).value = 'region';
    worksheet.getCell(9, 1).value = 'aggregation type (if any)'



    // the second series (crude oil) starts earlier than the others
    // I should find the longest series dynamically instead of hardcoding
    // the index 1
    data_rows[1].data.forEach((row, index) => {
      console.log(Number(Object.keys(row)[0]))
      console.log(Number(Object.keys(row)[0].slice(5, 6)))
      let monthIndex = Number(Object.keys(row)[0].slice(4, 6))
      let year = Number(Object.keys(row)[0].slice(0, 4))


      worksheet.getCell(index + 10, 1).value = `${monthIndex}/${year}`
    })
    // worksheet.getColumn(1).values = Object.keys(data_rows[0].data).reverse().map((rowLabel, index) => {
    //   if (index > 3) {
    //     return new Date(Number(rowLabel.slice(0, 4)), Number(rowLabel.slice(4, 6))).toString();
    //   }
    //   return rowLabel;
    // })


    // data_rows is an object of key value pairs representing a column.
    // insert values into columns below

    console.log('export data')
    data_rows.forEach((dataRow, colIndex) => {
      // get values from the data object and start inserting into columns,
      worksheet.getCell(6, 2 + colIndex).value = dataRow.name;
      worksheet.getCell(7, 2 + colIndex).value = dataRow.units;
      worksheet.getCell(8, 2 + colIndex).value = dataRow.region;
      let column = dataRow.data.map((rowObj: { string: string }) => { return Object.values(rowObj)[0] })
      // starting from column 2  
      column.reverse().forEach((cell, rowIndex) => {
        // should get dynamic value for 917 because column will lengthen with updates
        worksheet.getCell(1217 - rowIndex, 2 + colIndex).value = cell;
      })
    })





    worksheet.getCell('B5').value = 'All Products'
    worksheet.getCell('B5').font = { size: 16, bold: true }

    worksheet.getCell('B5').alignment = { horizontal: 'left' }
    worksheet.getColumn(3).border = {
      right: { style: 'thin' }
    }


    worksheet.spliceColumns(3, 0, [])
    worksheet.getCell('B9').value = 'Total'
    worksheet.getCell('B9').font = { size: 14, bold: true }


    worksheet.getCell('C9').value = 'check total';
    worksheet.getCell('C9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    // need to figure out how to fill formula dynamically to match data series length
    worksheet.fillFormula(
      'C10:C1217', 'IF((COUNTBLANK(D10)+COUNTBLANK(E10)+COUNTBLANK(J10)+COUNTBLANK(K10)+COUNTBLANK(L10)+ COUNTBLANK(B10))>0, NA(), ROUND((D10+E10+J10+K10+L10-B10),-1))')

    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'C10:C1217',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['C10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['C10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )

    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'C9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(C10:C1217,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(C10:C1217,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )


    worksheet.getCell('D5').value = 'Crude Oil'
    worksheet.getCell('D5').font = { size: 16, bold: true }
    worksheet.getCell('D5').alignment = { horizontal: 'left' }

    worksheet.spliceColumns(6, 0, [])
    worksheet.getCell('E5').value = 'Diesel'
    worksheet.getCell('E5').font = { size: 16, bold: true }
    worksheet.mergeCells('E5:I5')
    worksheet.getCell('E5').alignment = { horizontal: 'left' }
    worksheet.getColumn(9).border = {
      right: { style: 'thin' }
    }


    worksheet.getCell('E9').value = 'Total'
    worksheet.getCell('E9').font = { size: 14, bold: true }


    worksheet.getCell('F9').value = 'check total';
    worksheet.getCell('F9').border = {
      right: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      top: { style: 'thin' }
    }
    // need to figure out how to fill formula dynamically to match data series length
    worksheet.fillFormula('F10:F1217', 'IF((COUNTBLANK(G10:I10)+COUNTBLANK(E10))>0, NA(), ROUND(SUM(G10:I10)-E10,-1))')

    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'F10:F1217',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['F10=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['F10<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }
      ]
    }
    )

    // color coding for check column
    worksheet.addConditionalFormatting({
      ref: 'F9',
      rules: [
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(F10:F1217,"<>#N/A")=0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF00FF00' } } },
        },
        {
          priority: 1,
          type: 'expression',
          formulae: ['SUMIF(F10:F1217,"<>#N/A")<>0'],
          style: { fill: { type: 'pattern', pattern: 'solid', fgColor: {}, bgColor: { argb: 'FF7F7F' } } },
        }

      ]
    }
    )

    worksheet.getCell('J5').value = 'Hydrocarbon Gas Liquids'
    worksheet.getCell('J5').font = { size: 16, bold: true }
    worksheet.getCell('J5').alignment = { horizontal: 'left' }
    worksheet.getColumn(11).border = {
      right: { style: 'thin' }
    }


    worksheet.getCell('K5').value = 'Gasoline'
    worksheet.getCell('K5').font = { size: 16, bold: true }
    worksheet.getCell('K5').alignment = { horizontal: 'left' }


    worksheet.getCell('L5').value = 'Jet Fuel'
    worksheet.getCell('L5').font = { size: 16, bold: true }
    worksheet.getCell('L5').alignment = { horizontal: 'left' }


    // iterate over the cells and give each a bottom border,
    // making sure to copy the existing border cofiguration
    // to prevent loss of other borders
    worksheet.getRow(9).eachCell({ includeEmpty: true }, (cell) => {
      if (cell.border) {
        cell.border = {
          ...cell.border,
          bottom: { style: 'thin' }
        }
      } else {
        cell.border = { bottom: { style: 'thin' } }
      }
      console.log(cell.border)
    })

    name = 'US Petroleum Product Exports';

    dataset_name = 'Custom';
    worksheet.getRow(1).values = ["Data Group:", name]
    worksheet.getRow(1).font = { size: 16 }
    worksheet.getRow(2).values = ["Data Set Name (top level category):", dataset_name]
    worksheet.getRow(2).font = { size: 16 }
    worksheet.getRow(3).values = ["EIA API:", "https://www.eia.gov/opendata/"]
    worksheet.getRow(3).font = { size: 16 }
    worksheet.getRow(6).font = { bold: true }





    // autosize columns
    worksheet.columns.forEach(function (column, i) {
      let maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        let columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    })

    console.log('1166')

    worksheet.views = [
      { state: 'frozen', xSplit: 1, ySplit: 9, topLeftCell: 'B10', activeCell: 'A1' }
    ];

    return workbook;
  }

  eiaExcel = async (category_ID: number, custom_flag: string, paginationDto: PaginationDto) => {
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

    let workbook = new Excel.Workbook()
    let worksheet = workbook.addWorksheet('data');
    console.log('before name_cols')
    let name_cols = [{ header: 'Name', key: 'name', width: 60 },
    { header: 'Region', key: 'region', width: 20 },
    { header: 'Units', key: 'units', width: 20 },]
    console.log('after name_cols')

    let year_data = series[0].data

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

    return workbook;
  }

  aeo2021Excel = async (category_ID: number, custom_flag: string, paginationDto: PaginationDto) => {
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

    return workbook;
  }

  kayaExcel = async (category_ID: number, custom_flag: string, paginationDto: PaginationDto) => {
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

    return workbook;
  }

  customExcel = async (category_ID: number, custom_flag: string, paginationDto: PaginationDto) => {
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
    return workbook;
  }

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