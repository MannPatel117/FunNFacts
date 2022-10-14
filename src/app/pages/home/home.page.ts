import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthDataService } from 'src/app/services/auth-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: any;
  constructor(
    private auth: Auth,
    private authService: AuthDataService,
    private router: Router) { }

  quizTotal=0;
  learning=0;
  ngOnInit() {
    const userID=this.auth.currentUser.uid;
    this.authService.getUserById(userID).subscribe(res =>{
      this.username=res.name;
      this.learning=res.learn;
      this.quizTotal=res.quiz;
    });
  }
  @ViewChild('popover') popover;
  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl:true});
  }
  routeToLearn(){
    this.router.navigateByUrl('/learn');
  }

  routeToQuiz(){
    this.router.navigateByUrl('/quiz');
  }
}
