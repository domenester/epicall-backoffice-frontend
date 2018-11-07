import * as moment from 'moment';
import { postgreeIntervalMask } from '../../utils/date';

export const reportTableFields = () => ([
  { label: 'Data', value: 'createdAt'},
  { label: 'Logins Únicos', value: 'loginCount'},
  { label: 'Tempo Médio', value: 'timeLogged'},
  { label: 'Áudios Iniciados', value: 'audioCount'},
  { label: 'Áudio Tempo Médio', value: 'audioDuration'},
  { label: 'Vídeos Iniciados', value: 'videoCount'},
  { label: 'Vídeos Tempo Médio', value: 'videoDuration'},
  { label: 'Conferências Iniciadas', value: 'conferenceCount'},
  { label: 'Conferências Tempo Médio', value: 'conferenceDuration'}
]);

export const normalizingReport = (report: any) => {
  report.createdAt = moment(report.createdAt).format('DD/MM/YYYY');
  report.audioDuration = postgreeIntervalMask(report.audioDuration);
  report.videoDuration = postgreeIntervalMask(report.videoDuration);
  report.conferenceDuration = postgreeIntervalMask(report.conferenceDuration);
  report.timeLogged = postgreeIntervalMask(report.timeLogged);
  return report;
};

export const reportsNormalized = (reports: Array<any>) => reports.map( r => {
  return normalizingReport(r);
});
