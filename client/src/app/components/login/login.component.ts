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
  private router: Router,
  ) { }

  ngOnInit() {
  }
  
  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
  }
  
  this.authService.authenticateUser(user).subscribe(data => { //use service to verify the user
     if(data.success){
    this.authService.storeUserData(data.token, data.user);
    this.flashMessagesService.show('You are now logged in!',  {
      classes: ['alert', 'alert-success'], 
      timeout: 3000, 
    });
      this.router.navigate(['dashboard']); //take to dashboard on success
     }else{
      this.flashMessagesService.show('incorrect login details',  {
      classes: ['alert', 'alert-danger'], 
      timeout: 3000, 
    });
      this.router.navigate(['login']); //back to login on failure
     }
    
  });
}
}



// onLoginSubmit(){
    
 
//     const user = {
//       email: this.email,
//       password: this.password,
//       __v: 0
//     }
    
//     this.authService.authenticateUser(user).subscribe(
//       res => {
//           console.log(user);
//           console.log(user.password);
//           console.log(res)
//         if(!(res.success)){
//           this.flashMessage.show(res.msg, {
//             classes: ['alert', 'alert-danger'] });
//           //  this.router.navigate(['/login']);
//         } 
        
//         else if(res.user.__v == 0){
//           this.flashMessage.show( "Your account is still not verified", {
//             classes: ['alert', 'alert-danger'] });
//             this.router.navigate(['/login']);
//             // this.reS = true;
//         }
        
//         else{

//           this.flashMessage.show("You are now logged in", {
//             classes: ['alert', 'alert-success'] });
//           this.authService.storeUserData(res.token, res.user);
//           this.router.navigate(['/profile']);
//         //  }
//         }
//       },
//       err =>{
//         this.flashMessage.show('Something bad happened!', {
//             classes: ['alert', 'alert-danger'] });
//       });
//   }
  
// //   onResendVerification(){
// //     const user = {
// //       email: this.email,
// //       password: this.password,
// //       __v: 0
// //     }
// //     this.authService.reSendVeri(user).subscribe(
// //       res =>{
// //          this.flashMessage.show("Verification Email Re-sent", {
// //             classes: ['alert', 'alert-success'] });
// //       }
// //     );
// //   }


