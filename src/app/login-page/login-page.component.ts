import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/auth/authentication.service';
import { TokenStorageService } from '../_services/auth/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  pwShown=false;


  username:string ='';
  password:string='';
  constructor(public router:Router,private authService: AuthenticationService, private tokenService: TokenStorageService) {
    if(this.tokenService.getToken()){
      this.router.navigateByUrl('/')
    }
   }
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  login(): void {

    this.authService.login(this.username, this.password).subscribe({
      next: data => {
 //       this.tokenService.saveUser(data);
       this.tokenService.setToken(data['body']['access_token'],data['body']['refresh_token'],this.username);
      // localStorage.setItem('access_token', data['access_token']);
      // localStorage.setItem('refresh_token', data['refresh_token']);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log ('i am logged in ')

        this.router.navigateByUrl('/')

      },
      error: err => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
        console.log('error '+ this.errorMessage)
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(){
    this.authService.logout();
    // clear local storage
    this.tokenService.clear();
    console.log('succesfully logged out')

  }
}
