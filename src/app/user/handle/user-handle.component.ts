import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, UserService } from '../../services';
import { first } from 'rxjs/operators';
import { userByForm } from '../utils/user-format';

@Component({
  selector: 'app-user-handle',
  templateUrl: './user-handle.component.html',
  styleUrls: ['./user-handle.component.scss']
})
export class UserHandleComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  loading = false;
  perfils = [];
  userToHandle: any = {};

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [ this.userToHandle.first_name, [Validators.required, Validators.maxLength(100)]],
      racf: [ this.userToHandle.username, [Validators.required, Validators.maxLength(30)]],
      extension: [ this.userToHandle.extension, [Validators.required, Validators.maxLength(10)]],
      email: [ this.userToHandle.email, [Validators.required, Validators.email]],
      department: [ this.userToHandle.department, [Validators.required, Validators.maxLength(100)]],
      perfil: [ this.userToHandle.perfil, [Validators.required]]
    });

    this.userService.enums().subscribe(
      res => this.perfils = res.perfil.values
    );
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) { return; }
    this.loading = true;

    const handler = this.hasUserToHandle() ? 'update' : 'create';

    this.userService[handler](userByForm(this.f))
    .subscribe(
      res => {
        this.alertService.success(res.message);
        this.activeModal.close(res.message);
        this.loading = false;
      },
      error => {
        this.alertService.error(error.error.message);
        this.activeModal.dismiss(error.error.message);
        this.loading = false;
      });
  }

  hasUserToHandle() {
    return !(Object.keys(this.userToHandle).length === 0);
  }

  removeUser(event) {
    event.preventDefault();
    this.submitted = false;
    if ( !this.userToHandle.id ) { return this.alertService.error('Nenhum ID encontrado'); }
    this.userService.remove(this.userToHandle.id)
    .subscribe(
      res => {
        this.alertService.success(res.message);
        this.activeModal.close(res.message);
        this.loading = false;
      },
      error => {
        this.alertService.error(error.error.message);
        this.activeModal.dismiss(error.error.message);
        this.loading = false;
      });
  }
}
