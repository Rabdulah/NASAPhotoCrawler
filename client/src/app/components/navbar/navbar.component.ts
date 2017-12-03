import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import { FlashMessagesService } from 'ngx-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
  private validateService: ValidateService, 
  private flashMessagesService: FlashMessagesService,
  private authService:AuthService,
  private router: Router
  ) { }

  ngOnInit() {
  }
  onLogoutClick(){
    this.authService.logout();
    this.flashMessagesService.show('You are now logged out',  {
      classes: ['alert', 'alert-success'], 
      timeout: 3000, 
    });
    this.router.navigate(['/login']);
    return false;
  }

}
