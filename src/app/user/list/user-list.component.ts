import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../../services';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserHandleComponent } from '../handle/user-handle.component';

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
      userService.list().subscribe(
        users => {
          console.log('users', users);
          this.users = users;
          this.source = new LocalDataSource(users);
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
      columns: {
        username: { title: 'Username', filter: false },
        first_name: { title: 'Nome', filter: false },
        email: { title: 'Email', filter: false }
      }
    };
  }

  onSearch(query: string = '') {
    if (!query) { return this.source.reset(); }

    this.source.setFilter([
      { field: 'username', search: query },
      { field: 'first_name', search: query },
      { field: 'email', search: query  }
    ], false);
  }

  addUser() {
    this.modalService.open(UserHandleComponent, { size: 'lg' });
  }

  onUserRowSelect(event) {
    const activeModal = this.modalService.open(UserHandleComponent, { size: 'lg' });
    activeModal.componentInstance.userToHandle = event.data;
  }

}
