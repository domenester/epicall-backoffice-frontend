import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AlertService } from '../services';
import { Router, NavigationStart } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { api as apiConfig } from '../config/configs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isLogged: boolean;
  profilePhoto: string;
  username: string;
  popoverOpen: boolean;
  public uploader: FileUploader = new FileUploader(
    {url: `${apiConfig.url}/`, itemAlias: 'photo'}
  );

  constructor(
    private route: Router,
    private alertService: AlertService
  ) {
    this.popoverOpen = false;
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

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        console.log('ImageUpload:uploaded:', item, status, response);
    };
  }

}
