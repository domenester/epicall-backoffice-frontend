import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { declarations, imports, providers } from '../_dependencies/app.dependecies';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { LoginComponent } from './login.component';
import { UserListComponent } from '../user/list/user-list.component';
import { Subscription } from 'rxjs';

fdescribe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports, declarations, providers
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should throw login form with empty fields', () => {
    expect(component.onSubmit()).toBeUndefined();
  });

  it('should send login form with valid fields', () => {
    component.loginForm.setValue({
      username: 'daniel', password: '123456'
    });
    expect(component.onSubmit() instanceof Subscription).toBe(true);
  });
});
