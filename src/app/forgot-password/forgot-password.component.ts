import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, PasswordService } from '../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private alertService: AlertService,
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) { return; }
    this.loading = true;
    this.passwordService.requestNew(this.f.email.value)
    .pipe(first())
    .subscribe(
      res => {
        this.alertService.success(res.message);
        this.activeModal.dismiss(res.message);
      },
      error => {
        this.alertService.error(error.error.message);
        this.activeModal.dismiss(error.error.message);
        this.loading = false;
      });
  }

  dismissModal(reason: string) {
    this.activeModal.dismiss(reason);
  }
}
