import * as moment from 'moment';
import { PlayerViewComponent } from '../player-view/player-view.component';

export const tableSettings = () => ({
  actions: false,
  noDataMessage: 'Nenhum dado encontrado',
  columns: {
    participants: {
      title: 'Participantes',
      filter: false,
      valuePrepareFunction: (participants) => {
        let output = '';
        participants.forEach( (p, index) => {
          if (index !== participants.length - 1) { return output += `${p.name} | `; }
          return output += p.name;
        });
        return output;
      }
    },
    type: { title: 'Tipo', filter: false },
    date: {
      title: 'Data',
      filter: false,
      valuePrepareFunction: (date) => moment(date).format('DD/MM/YYYY HH:mm:ss')
    },
    duration: { title: 'Duração', filter: false },
    url: {
      title: 'Executar',
      filter: false,
      type: 'custom',
      renderComponent: PlayerViewComponent
    }
  }
});
