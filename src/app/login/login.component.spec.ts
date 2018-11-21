import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { declarations, imports, providers } from '../_dependencies/app.dependecies';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { LoginComponent } from './login.component';
import { UserListComponent } from '../user/list/user-list.component';

fdescribe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports, declarations, providers
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
