import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import { FlashMessagesService } from 'ngx-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: String;
  password: String;

  constructor(
  private validateService: ValidateService, 
  private flashMessagesService: FlashMessagesService,
  private authService:AuthService,
  private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
    this.flashMessagesService.show('Please fill in all fields',  {
      classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000;
    });
    };

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
 this.flashMessagesService.show('Please enter a valid email',  {
      classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000;
    });
    }; 
    
    //Register user
    if(this.validateService.validateEmail(user.email) && this.validateService.validateRegister(user)){
     this.authService.registerUser(user).subscribe(data => {
      if(data.success){
      this.flashMessagesService.show('You have successfully registered!',  {
      classes: ['alert', 'alert-success'], 
      timeout: 3000, 
    });
        this.router.navigate(['/login']);
      } else{
      this.flashMessagesService.show('Registration failed, please try again',  {
      classes: ['alert', 'alert-danger'], 
      timeout: 3000, 
    });
      this.router.navigate(['/register']);
      }
    });
    };
}
}