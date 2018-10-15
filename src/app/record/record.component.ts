import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AlertService, RecordService, UserService } from '../services';
import { PlayerViewComponent } from './player-view/player-view.component';
import { NgbModal, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { tableSettings } from './config/table-config';
import { NgbDateBRParserFormatter, unixValue } from '../utils/date';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  entryComponents: [ PlayerViewComponent ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateBRParserFormatter}
  ]
})
export class RecordComponent implements OnInit {

  records: any;
  loading = true;
  tableSettings: any;
  source: LocalDataSource;
  usersDropDown: any = [];
  dateStartFilter: NgbDateStruct;
  dateMin: NgbDateStruct;
  dateEndFilter: NgbDateStruct;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private recordService: RecordService,
    private userService: UserService,
    private modalService: NgbModal) {
      this.recordService.list().subscribe(
        records => {
          this.records = records;
          this.source = new LocalDataSource(records);
          this.loading = false;
        },
        error => {
          this.alertService.error(error.error.message);
          this.loading = false;
        }
      );

      this.userService.list().subscribe(
        users => {
          this.usersDropDown = users.map( user => {
            return {
              id: user.id,
              name: `${user.first_name} ${user.last_name}`
             };
          });
        }
      );

      this.form = this.formBuilder.group({
        user: ['0'],
        start: [''],
        end: [''],
        ext: ['']
      });
    }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.tableSettings = tableSettings();
  }

  onSearch(query: string = '') {
    if (!query) { return this.source.reset(); }

    this.source.setFilter([
      { field: 'participants', search: query, filter: (p) => p[0].name },
      { field: 'type', search: query },
      { field: 'date', search: query  },
      { field: 'duration', search: query  }
    ], false);
  }

  setStartEndDate(event, target) {
    this.dateMin = event;
  }

  onSubmit() {
    const userId = this.f.user.value;
    let params = '?';
    if (this.f.user.value) { params += `&userId=${this.f.user.value}`; }
    if (this.f.start.value) { params += `&start=${unixValue(this.f.start.value)}`; }
    if (this.f.end.value) { params += `&end=${unixValue(this.f.end.value)}`; }
    if (this.f.ext.value) { params += `&ext=${this.f.ext.value}`; }
    this.recordService.list(params).subscribe(
      records => {
        this.records = records;
        this.form.reset();
      },
      error => this.alertService.error(error.error.message),
    );
  }
}
