import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "src/app/app.component";
import { SidebarComponent } from "src/app/sidebar/sidebar.component";
import { AlertComponent } from "src/app/alert/alert.component";
import { AlertService, PasswordService } from "src/app/services";
import { Router } from "@angular/router";
import { FileUploadModule } from "ng2-file-upload";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { APP_BASE_HREF } from "@angular/common";
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from "@angular/router/testing";
import { rotas } from "../app-routing.module";
import { UserListComponent } from "src/app/user/list/user-list.component";
import { RecordComponent } from "src/app/record/record.component";
import { PlayerViewComponent } from "src/app/record/player-view/player-view.component";
import { VideoModalComponent } from "src/app/record/player-view/modal/video.modal.component";
import { ResetPasswordComponent } from "src/app/reset-password/reset-password.component";
import { LoginComponent } from "src/app/login/login.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(rotas),
        FileUploadModule,
        NgbPopoverModule,
        HttpModule,
        Ng2SmartTableModule,
        NgbDatepickerModule
      ],
      declarations: [
        ChangePasswordComponent,
        AppComponent,
        SidebarComponent,
        AlertComponent,
        UserListComponent,
        RecordComponent,
        PlayerViewComponent,
        VideoModalComponent,
        ResetPasswordComponent,
        LoginComponent
      ],
      providers: [
        AlertService,
        { provide: APP_BASE_HREF, useValue: '/' },
        PasswordService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
