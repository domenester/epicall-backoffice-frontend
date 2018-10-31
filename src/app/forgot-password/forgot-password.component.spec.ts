import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { FileUploadModule } from "ng2-file-upload";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { AppComponent } from "src/app/app.component";
import { SidebarComponent } from "src/app/sidebar/sidebar.component";
import { AlertComponent } from "src/app/alert/alert.component";
import { AlertService, PasswordService } from "src/app/services";
import { APP_BASE_HREF } from "@angular/common";
import { NgbActiveModal, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { rotas } from "src/app/app-routing.module";
import { UserListComponent } from "src/app/user/list/user-list.component";
import { RecordComponent } from "src/app/record/record.component";
import { PlayerViewComponent } from "src/app/record/player-view/player-view.component";
import { VideoModalComponent } from "src/app/record/player-view/modal/video.modal.component";
import { ResetPasswordComponent } from "src/app/reset-password/reset-password.component";
import { ChangePasswordComponent } from "src/app/change-password/change-password.component";
import { LoginComponent } from "src/app/login/login.component";
import { Ng2SmartTableModule } from "ng2-smart-table";

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule.withRoutes(rotas),
        FileUploadModule,
        NgbPopoverModule,
        RouterModule,
        HttpModule,
        Ng2SmartTableModule,
        NgbDatepickerModule,
        ReactiveFormsModule,
        NgbDatepickerModule
        
      ],
      declarations: [
        ForgotPasswordComponent,
        AppComponent,
        SidebarComponent,
        AlertComponent,
        UserListComponent,
        RecordComponent,
        PlayerViewComponent,
        VideoModalComponent,
        ResetPasswordComponent,
        ChangePasswordComponent,
        LoginComponent
      ],
      providers: [
        AlertService,
        { provide: APP_BASE_HREF, useValue: '/' },
        NgbActiveModal,
        PasswordService,
        HttpClient,
        HttpHandler
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
