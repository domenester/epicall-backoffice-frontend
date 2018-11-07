import { reportTableFields, reportsNormalized, normalizingReport } from './normalizer';
import * as moment from 'moment';
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';

export const exportToPdf = (reports: Array<any>) => {
  const columns = reportTableFields().map( f => f.label);
  const rows = reports.map( r => {
    const reportNormalized = normalizingReport(r);
    return Object.keys(reportNormalized).map( key => r[key]);
  });
  const doc = new jsPDF('p', 'pt') as any;
  doc.autoTable(columns, rows, {
    styles: { fontSize: 5 }
  });
  doc.save(`Relatório-${moment().format('DD-MM-YYYYHH:MM:SS')}.pdf`);
};
