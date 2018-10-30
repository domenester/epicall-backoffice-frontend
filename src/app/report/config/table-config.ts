import * as moment from 'moment';
import { postgreeValuePrepareFunction, postgreeIntervalSort } from '../../utils/ng-smart-table';

export const tableSettings = () => ({
  actions: false,
  noDataMessage: 'Nenhum dado encontrado',
  columns: {
    createdAt: { title: 'Data', filter: false, valuePrepareFunction: (createdAt) => {
      return moment(createdAt).format('DD/MM/YYYY');
    }},
    loginCount: { title: 'Logins Únicos', filter: false },
    timeLogged: {
      title: 'Tempo Médio',
      filter: false,
      valuePrepareFunction: postgreeValuePrepareFunction,
      compareFunction: postgreeIntervalSort
    },
    audioCount: { title: 'Iniciadas (Áudios)', filter: false },
    audioDuration: {
      title: 'Tempo Médio (Áudios)',
      filter: false,
      valuePrepareFunction: postgreeValuePrepareFunction,
      compareFunction: postgreeIntervalSort
    },
    videoCount: { title: 'Iniciadas (Vídeos)', filter: false },
    videoDuration: {
      title: 'Tempo Médio (Vídeos)',
      filter: false,
      valuePrepareFunction: postgreeValuePrepareFunction,
      compareFunction: postgreeIntervalSort
    },
    conferenceCount: { title: 'Iniciadas (Conf.)', filter: false },
    conferenceDuration: {
      title: 'Tempo Médio (Conf.)',
      filter: false,
      valuePrepareFunction: postgreeValuePrepareFunction,
      compareFunction: postgreeIntervalSort
    },
  }
});
