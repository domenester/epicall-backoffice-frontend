import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../../services';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserHandleComponent } from '../handle/user-handle.component';
import { defaultAlertMessage } from '../../utils/messages';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any;
  loading = true;
  tableSettings: object;
  source: LocalDataSource;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private modalService: NgbModal) {
      this.fetchUsers();
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

  fetchUsers() {
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

  async startHandlingUser(user = null) {
    const activeModal = this.modalService.open(UserHandleComponent, { size: 'lg' });
    if (user) { activeModal.componentInstance.userToHandle = user; }
    const modalResult = await activeModal.result.catch(err => err);
    this.fetchUsers();
  }

}
