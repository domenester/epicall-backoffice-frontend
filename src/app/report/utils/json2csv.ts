import { Parser as Json2csvParser } from 'json2csv';
import * as moment from 'moment';
import { postgreeIntervalMask } from '../../utils/date';

export default (reports: Array<any>) => {
  const fields = [
    { label: 'Data', value: 'createdAt'},
    { label: 'Logins Únicos', value: 'loginCount'},
    { label: 'Tempo Médio', value: 'timeLogged'},
    { label: 'Áudios Iniciados', value: 'audioCount'},
    { label: 'Áudio Tempo Médio', value: 'audioDuration'},
    { label: 'Vídeos Iniciados', value: 'videoCount'},
    { label: 'Vídeos Tempo Médio', value: 'videoDuration'},
    { label: 'Conferências Iniciadas', value: 'conferenceCount'},
    { label: 'Conferências Tempo Médio', value: 'conferenceDuration'}
  ];
  const json2csvParser = new Json2csvParser({ fields });
  const reportsNormalized = reports.map( r => {
    r.createdAt = moment(r.createdAt).format('DD/MM/YYYY');
    r.audioDuration = postgreeIntervalMask(r.audioDuration);
    r.videoDuration = postgreeIntervalMask(r.videoDuration);
    r.conferenceDuration = postgreeIntervalMask(r.conferenceDuration);
    r.timeLogged = postgreeIntervalMask(r.timeLogged);
    return r;
  });
  return json2csvParser.parse(reportsNormalized);
};
