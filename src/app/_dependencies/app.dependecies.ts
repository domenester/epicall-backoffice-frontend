import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';

import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { FileSelectDirective } from 'ng2-file-upload';

import {
  AuthenticationService,
  AlertService,
  FileUploadService,
  PasswordService,
  UserService,
  RecordService,
  ReportService,
  RequestService
} from '../services';

import { AuthGuard } from '../auth/auth.guard';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { AlertComponent } from '../alert/alert.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserListComponent } from '../user/list/user-list.component';
import { UserHandleComponent } from '../user/handle/user-handle.component';
import { RecordComponent } from '../record/record.component';
import { PlayerViewComponent } from '../record/player-view/player-view.component';
import { VideoModalComponent } from '../record/player-view/modal/video.modal.component';
import { ReportComponent } from '../report/report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserDropdownComponent } from '../user/dropdown/user-dropdown.component';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../services/message.service';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from '../_modules/material.module';
import { KeysPipe } from '../_pipes/keys.pipe';

export const declarations = [
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
  UserDropdownComponent,
  RecordComponent,
  PlayerViewComponent,
  VideoModalComponent,
  ReportComponent,
  KeysPipe,
  MessageComponent
];

export const imports = [
  BrowserModule,
  NgMultiSelectDropDownModule.forRoot(),
  AppRoutingModule,
  BrowserAnimationsModule,
  MatNativeDateModule,
  DemoMaterialModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  Ng2SmartTableModule,
  NgbModule
];

export const providers = [
  AuthenticationService,
  AlertService,
  AuthGuard,
  FileUploadService,
  MessageService,
  PasswordService,
  ReportService,
  RecordService,
  RequestService,
  UserService
];

export const entryComponents = [
  ForgotPasswordComponent,
  UserHandleComponent,
  VideoModalComponent
];
