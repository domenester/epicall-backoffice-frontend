import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, AlertService, PasswordService } from '../services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private passwordService: PasswordService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) { return; }
    this.loading = true;
    this.passwordService.reset( this.f.password.value, this.route.snapshot.params['token'])
    .subscribe(
      res => this.router.navigate([
        '/login',
        { queryParams:
          { passwordReset: res.message }
        }]),
      error => {
        this.alertService.error(error.error.message);
        this.loading = false;
      });
  }

}
