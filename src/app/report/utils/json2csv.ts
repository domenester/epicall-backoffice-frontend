import { Parser as Json2csvParser } from 'json2csv';
import { reportTableFields, reportsNormalized } from './normalizer';
import { saveAs } from 'file-saver';

export const exportToCsv = (reports: Array<any>) => {
  const fields = reportTableFields();
  const json2csvParser = new Json2csvParser({ fields });
  const reportsToParse = reportsNormalized(reports);
  const csv = json2csvParser.parse(reportsToParse);
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'Relatórios.csv');
};
