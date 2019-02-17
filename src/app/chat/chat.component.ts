import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { Subject } from 'rxjs';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('MessagesList') private MessagesListEelem: ElementRef;
  messages: Subject<Array<Message>> = new Subject<Array<Message>>()
  
  constructor(private messagesService: MessagesService) { }

  currentUser = +(localStorage.getItem('currentUserId'));
  newMessageText: string = '';
  pageNumber: number = 0;
  allMessagesLenght: number = 0;

  updateMessages(pageNumber) {
    this.pageNumber = pageNumber;
    this.messagesService.GetMessages(this.pageNumber).subscribe(res => {
      this.messages.next(res.messages)
      this.allMessagesLenght = res.allMessagesLenght
      this.scrollToBottom()
    })
  }

  ngOnInit() {
    this.updateMessages(this.pageNumber);
  }

  PreviousMessages() {
    --this.pageNumber
    this.updateMessages(this.pageNumber);
  }
  NextMessages() {
    ++this.pageNumber
    this.updateMessages(this.pageNumber);
  }

  SendMessaage() {
    this.pageNumber = 0;
    console.log('newMessageText', this.newMessageText);
    const _newMessageText = this.newMessageText
    this.newMessageText = ''
    
    this.messagesService.addNewMessage(_newMessageText).subscribe((res) => {
      this.pageNumber = 0;
      this.updateMessages(this.pageNumber);
      
    })
  }
  scrollToBottom(): void {
    try {
        this.MessagesListEelem.nativeElement.scrollTop = this.MessagesListEelem.nativeElement.scrollHeight;
    } catch(err) { }                 
}
}
