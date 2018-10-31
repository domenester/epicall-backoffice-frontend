import { Component, OnInit } from '@angular/core';
import { defaultAlertMessage } from '../utils/messages';
import { AlertService } from '../services';
import { MessageService } from '../services/message.service';
import { TreeviewItem, TreeItem, TreeviewConfig } from 'ngx-treeview';
import { treeViewFormat } from './utils/tree-view';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messages: any;
  treeItems: TreeviewItem[];
  loading = true;
  treeConfig: object;

  constructor(
    private messageService: MessageService,
    private alertService: AlertService) {
      this.fetchMessages();
  }

  ngOnInit() {
    this.treeConfig = TreeviewConfig.create({
        hasAllCheckBox: false,
        hasFilter: false,
        hasCollapseExpand: true,
        decoupleChildFromParent: true,
        maxHeight: 400
    });
  }

  fetchMessages() {
    this.messageService.list().subscribe(
      messages => {
        this.messages = messages;
        this.treeItems = [treeViewFormat(messages)];
        this.loading = false;
      },
      error => {
        this.alertService.error(error.error.message || defaultAlertMessage);
        this.loading = false;
    });
  }

  selectTreeView(e) {
    console.log('e', e);
  }
  onSearch(query: string = '') {

  }
}
