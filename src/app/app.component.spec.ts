import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from "src/app/sidebar/sidebar.component";
import { AlertComponent } from "src/app/alert/alert.component";
import { FileUploadModule } from "ng2-file-upload";
import { NgbPopoverModule, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { AlertService, AuthenticationService } from "src/app/services";
import { rotas } from "./app-routing.module";
import { UserListComponent } from "src/app/user/list/user-list.component";
import { HttpClientModule, HttpClient, HttpHandler } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { RecordComponent } from "src/app/record/record.component";
import { PlayerViewComponent } from "src/app/record/player-view/player-view.component";
import { VideoModalComponent } from "src/app/record/player-view/modal/video.modal.component";
import { ResetPasswordComponent } from "src/app/reset-password/reset-password.component";
import { ChangePasswordComponent } from "src/app/change-password/change-password.component";
import { LoginComponent } from "src/app/login/login.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { APP_BASE_HREF, Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";

let location: Location;
let router: Router;
let fixture;

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(rotas),
        FileUploadModule,
        NgbPopoverModule,
        HttpClientModule,
        HttpModule,
        Ng2SmartTableModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule
      ],
      declarations: [
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
        HttpClient,
        HttpHandler,
        { provide: APP_BASE_HREF, useValue: '/' },
        AuthGuard,
        AuthenticationService
      ]
    }).compileComponents();
  }));



  it('should render title in a h2 tag', fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    const fixture = TestBed.createComponent(AppComponent);
    router.navigate(['']);
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Login');
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'epicall-backoffice-frontend'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('epicall-backoffice-frontend');
  }));


});
