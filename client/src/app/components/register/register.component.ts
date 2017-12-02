import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private flashMessagesService: FlashMessagesService) { }

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
      classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000;
    });
    };

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
 this.flashMessagesService.show('Please enter a valid email',  {
      classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
      timeout: 3000, // Default is 3000;
    });
    };
}
}