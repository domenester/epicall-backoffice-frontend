import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService, AlertService, ReportService } from '../services';
import { defaultAlertMessage } from '../utils/messages';
import * as moment from 'moment';
import { postgreeFilter } from '../utils/ng-smart-table';
import { UserDropdownComponent } from '../user/dropdown/user-dropdown.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tableSettings } from './config/table-config';
import { formatQueryString } from '../utils/';
import { ngbDateStructToIsoDate } from '../utils/date';

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
  types: Array< {id: string, name: string} > = [
    { id: '0', name: 'Analítico' },
    { id: '1', name: 'Consolidado' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private alertService: AlertService) {
      this.fetchReports({});
      this.form = this.formBuilder.group({
        users: [[]],
        start: [],
        end: [],
        extension: [],
        department: [],
        grouping: []
      });
  }

  ngOnInit() {
    this.tableSettings = tableSettings();
  }

  get f() { return this.form.controls; }

  fetchReports(filter: any) {
    this.reportService.list(filter).subscribe(
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

  userSelected(e: any) { this.f.users.setValue(e.map( user => user.id )); }

  onSubmit() {
    const start = this.f.start.value ? ngbDateStructToIsoDate(this.f.start.value) : undefined;
    const end = this.f.end.value ? ngbDateStructToIsoDate(this.f.end.value) : undefined;
    const reportFilter = {
      users: this.f.users.value || undefined,
      extension: this.f.extension.value || undefined,
      department: this.f.department.value || undefined,
      start,
      end,
      grouping: this.f.grouping.value || undefined
    };

    this.loading = true;
    this.fetchReports(reportFilter);
    this.form.reset();
  }
}
