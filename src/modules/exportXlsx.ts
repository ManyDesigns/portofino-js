import CrudActionEntity from '../entity/CrudActionEntity';
import { ExportOptions } from '../types/CrudActionTypes';
import { EntityProperty } from '../types/EntityTypes';

export default function exportXlsx(
  options: ExportOptions,
  properties: EntityProperty[],
  entities: CrudActionEntity[],
  omitProps: string[] = []
): void {
  let XLSX: any;
  try {
    XLSX = require('xlsx');
  } catch (e) {
    console.error(
      "[Portofino] To export an xlsx you must run 'npm i --save xlsx'"
    );
    return;
  }

  //TODO autofit cols https://github.com/SheetJS/sheetjs#column-properties

  const rows = entities.map((entity) => {
    const obj = {};
    properties.forEach((p) => {
      if (!omitProps.includes(p.name))
        obj[p.label || p.name] = entity.getValue(p.name);
    });
    return obj;
  });

  const wb = XLSX.utils.book_new();
  wb.Props = {
    Title: options.title,
    CreatedDate: new Date(),
  };

  wb.SheetNames.push(options.sheetName || 'Sheet 1');
  const ws = XLSX.utils.json_to_sheet(rows);
  wb.Sheets[wb.SheetNames[0]] = ws;

  const wbout = XLSX.writeFile(wb, `${options.title}.xlsx`, {
    bookType: 'xlsx',
    type: 'binary',
  });
}
