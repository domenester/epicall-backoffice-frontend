import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isLogged: boolean;
  profilePhoto: string;
  username: string;

  constructor(private route: Router) {
    route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login') { return this.isLogged = false; }
        this.isLogged = localStorage.getItem('currentUser') ? true : false;
      }
    });
  }

  ngOnInit() {
    let currentUser = localStorage.getItem('currentUser');
    try { currentUser = JSON.parse(currentUser); } catch (err) {}
    this.profilePhoto = (currentUser as any).profilePhoto;
    this.username = `${(currentUser as any).first_name} ${(currentUser as any).last_name}`;
  }

}
