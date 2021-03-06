import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService, AlertService, FileUploadService } from '../services';
import { Router, NavigationStart } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { api as apiConfig } from '../config/configs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('profilePictureSelect')
  profilePictureSelectEl: ElementRef;

  isLogged: boolean;
  profilePhoto: string;
  username: string;
  popoverOpen: boolean;
  uploader: FileUploader;

  constructor(
    private route: Router,
    private alertService: AlertService,
    private fileUploadService: FileUploadService
  ) {
    this.popoverOpen = false;
    route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login') { return this.isLogged = false; }
        this.isLogged = localStorage.getItem('currentUser') ? true : false;
      }
    });
    fileUploadService.initializaUploader(
      '/user/uploadProfilePicture', 'avatar', true
    );
    this.uploader = fileUploadService.getUploader();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.profilePhoto = `${this.profilePhoto.split('?')[0]}?changedAt=${(new Date()).getTime()}`;
      this.profilePictureSelectEl.nativeElement.value = '';
      // This reload is for clean image cache
      // window.location.reload();
    };
  }

  ngOnInit() {
    let currentUser = localStorage.getItem('currentUser');
    try { currentUser = JSON.parse(currentUser); } catch (err) {}
    this.profilePhoto = (currentUser as any).profilePhoto;
    // this.profilePhoto = '';
    this.username = (currentUser as any).fullName;
  }

  triggerFileSelect() {
    this.profilePictureSelectEl.nativeElement.click();
  }
}
