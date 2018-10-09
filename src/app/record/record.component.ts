import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AlertService } from '../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  users: any;
  loading = true;
  tableSettings: object;
  source: LocalDataSource;

  constructor(
    private alertService: AlertService,
    private modalService: NgbModal) {
      this.source = new LocalDataSource([]);
      this.loading = false;
    }

  ngOnInit() {
    this.tableSettings = {
      actions: false,
      noDataMessage: 'Nenhum dado encontrado',
      columns: {
        users: { title: 'Participantes', filter: false },
        type: { title: 'Tipo', filter: false },
        date: { title: 'Data', filter: false },
        duration: { title: 'Duração', filter: false }
      }
    };
  }

  onSearch(query: string = '') {
    if (!query) { return this.source.reset(); }

    this.source.setFilter([
      { field: 'users', search: query },
      { field: 'type', search: query },
      { field: 'date', search: query  }
    ], false);
  }
}
