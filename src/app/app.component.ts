import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EvolvicePracticalTask';
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Home',
        link: './home',
        index: 0
      }, {
        label: 'Maps',
        link: './maps',
        index: 1
      }, {
        label: 'Chat',
        link: './chat',
        index: 2
      },
    ];
  }
  ngOnInit(): void {
    localStorage.setItem('currentUserId', '1'),
      localStorage.setItem('currentUserName', 'User 1'),
      this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
      });
  }
}
