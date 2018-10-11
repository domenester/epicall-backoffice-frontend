import { Component, OnInit, Input, Output } from '@angular/core';
import { LocalDataSource, ViewCell, Cell } from 'ng2-smart-table';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoModalComponent } from './video.modal';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss'],
  entryComponents: [ VideoModalComponent ]
})

export class PlayerViewComponent implements OnInit {

  @Input()
  public value: string;

  @Input()
  rowData: any;

  url: string;
  type: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    console.log('Player Value', this.value);
    this.url = this.value;
    this.type = this.rowData.type;
  }

  openVideo() {
    const activeModal = this.modalService.open(VideoModalComponent, { size: 'lg' });
    activeModal.componentInstance.url = this.url;
    activeModal.componentInstance.type = this.type;
  }

}
