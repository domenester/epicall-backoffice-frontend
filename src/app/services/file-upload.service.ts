import { Injectable, OnInit } from '@angular/core';
import { api as config } from '../config/configs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { api as apiConfig } from '../config/configs';

@Injectable({
  providedIn: 'root',
})

export class FileUploadService {

    uploader: FileUploader;

    public initializaUploader(path: string, itemAlias: string, autoUpload: boolean = false) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      this.uploader = new FileUploader({
        url: `${apiConfig.url}${path}`,
        itemAlias,
        autoUpload,
        headers: [
          { name: 'userId', value: currentUser.id }
        ]
      });
      this.uploader.onBeforeUploadItem = (file) => {
        file.withCredentials = false;
      };
    }
    public getUploader() {
      return this.uploader;
    }
}
