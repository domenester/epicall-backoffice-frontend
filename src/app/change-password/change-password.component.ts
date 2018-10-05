import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, PasswordService } from '../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private passwordService: PasswordService,
      private alertService: AlertService) {}

  ngOnInit() {
      this.form = this.formBuilder.group({
          password: ['', Validators.required],
          newPassword: ['', Validators.required]
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.passwordService.change(this.f.password.value, this.f.newPassword.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success(data.message);
                  this.loading = false;
              },
              error => {
                  this.alertService.error(error.error.message);
                  this.loading = false;
              });
  }
}
