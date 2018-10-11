import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FileSelectDirective } from 'ng2-file-upload';

import { AuthenticationService, AlertService, FileUploadService, PasswordService, UserService, RecordService } from './services';

import { AuthGuard } from './auth/auth.guard';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserListComponent } from './user/list/user-list.component';
import { UserHandleComponent } from './user/handle/user-handle.component';
import { RecordComponent } from './record/record.component';
import { PlayerViewComponent } from './record/player-view/player-view.component';
import { VideoModalComponent } from './record/player-view/video.modal';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SidebarComponent,
    ChangePasswordComponent,
    FileSelectDirective,
    UserListComponent,
    UserHandleComponent,
    RecordComponent,
    PlayerViewComponent,
    VideoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgbModule
  ],
  providers: [
    AuthenticationService,
    AlertService,
    AuthGuard,
    FileUploadService,
    PasswordService,
    RecordService,
    UserService
  ],
  entryComponents: [
    ForgotPasswordComponent,
    UserHandleComponent,
    VideoModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
