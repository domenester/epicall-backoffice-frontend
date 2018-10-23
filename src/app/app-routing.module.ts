import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './auth/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserListComponent } from './user/list/user-list.component';
import { RecordComponent } from './record/record.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user/list', component: UserListComponent },
  { path: 'report/list', component: ReportComponent },
  { path: 'record/list', component: RecordComponent },
  { path: 'forgotPassword', component: ResetPasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
