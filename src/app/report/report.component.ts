import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService, AlertService, ReportService } from '../services';
import { defaultAlertMessage } from '../utils/messages';
import * as moment from 'moment';
import { postgreeValuePrepareFunction, postgreeIntervalSort, postgreeFilter } from '../utils/ng-smart-table';
import { UserDropdownComponent } from '../user/dropdown/user-dropdown.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  entryComponents: [UserDropdownComponent],
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  reports: any;
  loading = true;
  tableSettings: object;
  source: LocalDataSource;

  @Input() dropdownList: any = [];

  dateStartFilter: NgbDateStruct;
  dateMin: NgbDateStruct;
  dateEndFilter: NgbDateStruct;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private alertService: AlertService) {
      this.fetchReports();
      this.form = this.formBuilder.group({
        user: [[]],
        start: [''],
        end: [''],
        ext: [''],
        departament: [''],
        type: ['']
      });
  }

  ngOnInit() {
    this.tableSettings = {
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
    };
  }

  get f() { return this.form.controls; }

  fetchReports() {
    this.reportService.list().subscribe(
      reports => {
        this.reports = reports;
        this.source = new LocalDataSource(reports);
        this.loading = false;
      },
      error => {
        this.alertService.error(error.error.message || defaultAlertMessage);
        this.loading = false;
    });
  }

  setStartEndDate(event, target) {
    this.dateMin = event;
  }

  onSearch(query: string = '') {
    if (!query) { return this.source.reset(); }

    this.source.setFilter([
      { field: 'createdAt', search: query },
      { field: 'loginCount', search: query },
      { field: 'timeLogged', search: query, filter: postgreeFilter },
      { field: 'audioCount', search: query },
      { field: 'audioDuration', search: query, filter: postgreeFilter },
      { field: 'videoCount', search: query },
      { field: 'videoDuration', search: query, filter: postgreeFilter },
      { field: 'conferenceCount', search: query },
      { field: 'conferenceDuration', search: query, filter: postgreeFilter }
    ], false);
  }

  userSelected(e: any) { this.f.user.setValue(e.map( user => user.id )); }

  onSubmit() {}
}
