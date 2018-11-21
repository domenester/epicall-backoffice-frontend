import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthenticationService } from '../';
import { declarations, imports, providers, entryComponents } from '../../_dependencies/app.dependecies';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';

describe('Authentication Service', () => {

  let testBedService: AuthenticationService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations, imports, providers
    }).compileComponents();
    testBedService = TestBed.get(AuthenticationService);
  });

  it('should request the login service with a valid user', (done: DoneFn) => {
    testBedService.login(
      'daniel', '123456'
    ).subscribe( res => done() );
  });

  it('should throw trying to login with an invalid user', (done: DoneFn) => {
    testBedService.login(
      'daniel', '1234567'
    ).subscribe(
      res => res,
      err => done()
    );
  });
});
