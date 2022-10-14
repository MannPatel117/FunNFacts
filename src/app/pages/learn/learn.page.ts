import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AuthDataService } from 'src/app/services/auth-data.service';
@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
})
export class LearnPage implements OnInit {

  @ViewChild('swiper') swiper: SwiperComponent;
  slideNo:number;
  constructor(private router: Router,
    private auth: Auth,
    private authservice: AuthDataService) { }
  ngOnInit(){
    this.slideNo=1; 
    const uid=this.auth.currentUser.uid;
    this.authservice.updateQuiz(uid,this.slideNo);
  }
  
  
  ngAfterContentChecked()
  {
      if(this.swiper)
      {
        this.swiper.updateSwiper({
          
        });
        
      }
  }
  updateData(uid,slideNo)
  {
    if(slideNo>5)
    {
      slideNo=5;
    }
    this.authservice.updateQuiz(uid,this.slideNo);
  }
  routeToHome(){
    this.router.navigateByUrl('/home');
  }
  slideChanged()
  {
      const uid=this.auth.currentUser.uid;
      this.slideNo=this.slideNo+1;
      if(this.slideNo>5)
      {
        this.slideNo=5;
      }
      this.updateData(uid,this.slideNo);
      console.log(this.slideNo);
  }
}
