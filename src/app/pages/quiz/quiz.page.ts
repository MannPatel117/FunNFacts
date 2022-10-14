import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthDataService } from 'src/app/services/auth-data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  constructor(
    private router: Router,
    private auth: Auth,
    private authservice: AuthDataService,
    private loadingController: LoadingController
  ) { }
  q1Ans:string;
  q1=0;
  q2Ans:string;
  q2=0;
  q3Ans:string;
  q3=0;
  q4Ans:string;
  q4=0;
  q5Ans:string;
  q5=0;
  sum=0;
  ngOnInit() {
    const uid= this.auth.currentUser.uid;
    this.authservice.getUserById(uid).subscribe(res=>{
      this.q1Ans=res.q1;
      this.q2Ans=res.q2;
      this.q3Ans=res.q3;
      this.q4Ans=res.q4;
      this.q5Ans=res.q5;
    });
  }
  routeToHome(){
    this.router.navigateByUrl('/home');
  }
  async submit(){
    const loading = await this.loadingController.create();
    await loading.present();
    if(this.q1Ans == "28")
    {
      this.q1=1;
    }
    if(this.q1Ans != "28")
    {
      this.q1=0;
    }
    if(this.q2Ans == "Rajastan")
    {
      this.q2=1;
    }
    if(this.q2Ans != "Rajastan")
    {
      this.q2=0;
    }
    if(this.q3Ans == "Hyderabad")
    {
      this.q3=1;
    }
    if(this.q3Ans != "Hyderabad")
    {
      this.q3=0;
    }
    if(this.q4Ans == "Jaipur")
    {
      this.q4=1;
    }
    if(this.q4Ans != "Jaipur")
    {
      this.q4=0;
    }
    if(this.q5Ans == "Mumbai")
    {
      this.q5=1;
    }
    if(this.q5Ans != "Mumbai")
    {
      this.q5=0;
    }
    this.sum=this.q1+this.q2+this.q3+this.q4+this.q5;
    console.log(this.sum);
    const uid=this.auth.currentUser.uid;
    this.authservice.updateScore(uid, this.q1Ans, this.q2Ans, this.q3Ans, this.q4Ans, this.q5Ans, this.sum);
    await loading.dismiss();
    this.router.navigateByUrl('/home', {replaceUrl: true});
  }
}
