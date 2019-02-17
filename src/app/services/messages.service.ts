import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Message } from '../models/message';
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  result = {
    messages: [],
    allMessagesLenght: 0
  }
  constructor(private http: HttpClient) { }

  GetMessages(pageNumber: number = 0, searchText: string = '') {

    return this.http.get(env.BaseURL + '/messages').pipe(map((res: Message[]) => {
      this.result.allMessagesLenght = res.length;
      if (pageNumber <= 0) {
        this.result.messages = res.slice(Math.max(res.length - 5, 1))
      } else {
        const Newlenght = res.length - (5 * (pageNumber))
        this.result.messages = res.slice(Newlenght - 5, Newlenght)
      }
      return this.result;
    }))
  }
  addNewMessage(newMessageText: string): any {
    const newMessage = {
      // Id: (this.result.messages[this.result.messages.length - 1].id) + 1,
      MessageText: newMessageText,
      CreatedDate: Date.now(),
      ModifiedDate: 0,
      CreatedByUserId: +(localStorage.getItem('currentUserId')),
      CreatedByUserName: localStorage.getItem('currentUserName'),
    }
    return this.http.post(env.BaseURL + '/messages', newMessage)
  }

  latestMessage(): any {
    return this.http.get(env.BaseURL + '/messages').pipe(map((res: Message[]) => {
      return res.slice(res.length - 1)
    }))
  }

}
