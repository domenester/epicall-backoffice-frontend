import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isLogged: boolean;

  constructor(private route: Router) {
    route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login') { return this.isLogged = false; }
        this.isLogged = localStorage.getItem('currentUser') ? true : false;
      }
    });
  }
  title = 'epicall-backoffice-frontend';
}
