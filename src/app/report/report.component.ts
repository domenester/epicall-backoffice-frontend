import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService, AlertService } from '../services';
import { defaultAlertMessage } from '../utils/messages';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  users: any;
  loading = true;
  tableSettings: object;
  source: LocalDataSource;

  constructor(
    private userService: UserService,
    private alertService: AlertService) {
      this.fetchReports();
  }

  ngOnInit() {
    this.tableSettings = {
      actions: false,
      noDataMessage: 'Nenhum dado encontrado',
      columns: {
        username: { title: 'RACF', filter: false },
        fullName: { title: 'Nome', filter: false },
        email: { title: 'Email', filter: false },
        extension: { title: 'Ramal', filter: false },
        department: { title: 'Departamento', filter: false }
      }
    };
  }

  fetchReports() {
    this.userService.list().subscribe(
      users => {
        this.users = users;
        this.source = new LocalDataSource(users);
        this.loading = false;
      },
      error => {
        this.alertService.error(error.error.message || defaultAlertMessage);
        this.loading = false;
    });
  }

  onSearch(query: string = '') {
    if (!query) { return this.source.reset(); }

    this.source.setFilter([
      { field: 'fullName', search: query },
      { field: 'username', search: query },
      { field: 'email', search: query  },
      { field: 'extension', search: query  },
      { field: 'department', search: query  }
    ], false);
  }
}
