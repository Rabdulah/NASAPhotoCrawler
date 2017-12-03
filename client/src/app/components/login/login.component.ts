import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email: String;
password: String;
 
   constructor(
  private flashMessagesService: FlashMessagesService,
  private authService:AuthService,
  private router: Router
  ) { }

  ngOnInit() {
  }
  
  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
  }
  
   this.authService.authenticateUser(user).subscribe(data => {
     if(data.success){
    this.authService.storeUserData(data.token, data.user);
    this.flashMessagesService.show('You are now logged in!',  {
      classes: ['alert', 'alert-success'], 
      timeout: 3000, 
    });
       this.router.navigate(['dashboard']);
     }else{
      this.flashMessagesService.show('incorrect login details',  {
      classes: ['alert', 'alert-danger'], 
      timeout: 3000, 
    });
       this.router.navigate(['login']);
     }
    
   });
}
}