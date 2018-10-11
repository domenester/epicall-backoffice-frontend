import { Component, OnInit, Input, Output } from '@angular/core';
import { LocalDataSource, ViewCell, Cell } from 'ng2-smart-table';
import * as moment from 'moment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video.modal.html',
})

export class VideoModalComponent implements OnInit {

  url: string;
  type: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {}

}
