import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AlertService, RecordService } from '../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  records: any;
  loading = true;
  tableSettings: object;
  source: LocalDataSource;

  constructor(
    private alertService: AlertService,
    private recordService: RecordService,
    private modalService: NgbModal) {
      this.recordService.list().subscribe(
        records => {
          console.log('records', records);
          this.records = records;
          this.source = new LocalDataSource(records);
          this.loading = false;
        },
        error => {
          this.alertService.error(error.error.message);
          this.loading = false;
        });
    }

  ngOnInit() {
    this.tableSettings = {
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
          type: 'html',
          valuePrepareFunction: (url) => {
            return `<audio controls>
                      <source src="${url}" type="audio/mp3">
                    </audio>`;
          }
        }
      }
    };
  }

  onSearch(query: string = '') {
    if (!query) { return this.source.reset(); }

    this.source.setFilter([
      { field: 'participants', search: query },
      { field: 'type', search: query },
      { field: 'date', search: query  },
      { field: 'duration', search: query  }
    ], false);
  }
}
