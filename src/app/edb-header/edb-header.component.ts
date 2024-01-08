import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/auth/authentication.service';
import { TokenStorageService } from '../_services/auth/token-storage.service';

@Component({
  selector: 'app-edb-header',
  templateUrl: './edb-header.component.html',
  styleUrls: ['./edb-header.component.css']
})
export class EdbHeaderComponent {
  isMenuOpen=false
  showDropdown=false

  constructor(private router:Router,private authService: AuthenticationService,private tokenService: TokenStorageService){}
  isAuthenticated=this.authService.isAuthenticated()

  logout(){
    this.authService.logout();
    // clear local storage
    this.tokenService.clear();
    console.log('succesfully logged out')
    this.router.navigateByUrl('/')
  //  window.location.reload()


  }
}
