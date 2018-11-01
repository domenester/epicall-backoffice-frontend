import { Component, OnInit } from '@angular/core';
import { defaultAlertMessage } from '../utils/messages';
import { AlertService } from '../services';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messages: any;
  loading = true;
  messagesDisplayed: any;
  from: string;
  to: string;

  constructor(
    private messageService: MessageService,
    private alertService: AlertService) {
      this.fetchMessages();
  }

  ngOnInit() {}

  fetchMessages() {
    this.messageService.list().subscribe(
      messages => {
        this.messages = messages;
        this.loading = false;
      },
      error => {
        this.alertService.error(error.error.message || defaultAlertMessage);
        this.loading = false;
    });
  }

  selectConversation(from: string, to: string) {
    this.from = from;
    this.to = to;
    this.messagesDisplayed = this.messages[from][to];
    console.log('e', this.messagesDisplayed);
  }

  onSearch(query: string = '') {

  }
}
