import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AlertService, RecordService } from '../services';
import { PlayerViewComponent } from './player-view/player-view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { tableSettings } from './config/table-config';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  entryComponents: [ PlayerViewComponent ]
})
export class RecordComponent implements OnInit {

  records: any;
  loading = true;
  tableSettings: any;
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
    this.tableSettings = tableSettings();
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
