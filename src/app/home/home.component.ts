import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  latestMessages
  constructor(
    private messagesService: MessagesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.messagesService.latestMessage().subscribe(res => {
      this.latestMessages = res
    })
  }
  navToChat() {
    this.router.navigate(['/chat'])
  }

}
