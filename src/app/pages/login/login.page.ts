import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthDataService } from 'src/app/services/auth-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthDataService,
    private router: Router,

  ) { }
  

  get email(){
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();
    
    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user)
    {
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }
    else
    {
      this.showAlert('Login Failed', 'Please Try Again!');
    }
  }

  goToRegister(){
    this.router.navigateByUrl('register', {replaceUrl: true});
  }
  async showAlert(header,message)
  {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
