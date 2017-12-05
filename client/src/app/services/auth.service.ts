import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  private databaseURL = "https://lab5-rabdulah.c9users.io:8081/api";
  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.databaseURL + '/register', user,{headers: headers})
      .map(res => res.json());
  }
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.databaseURL+ '/authenticate', user,{headers: headers})
      .map(res => res.json());
  }
  
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('https://lab5-rabdulah.c9users.io:8081/api/profile',{headers: headers})
      .map(res => res.json());      
  }
  
  loadToken(){
      const token = localStorage.getItem('id_token');
      this.authToken = token;
  }
  
  loggedIn(){
      return tokenNotExpired('id_token');
  }
  
    storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  
    logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  
      reSendVeri(user){
        let headers=new Headers();
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append('Content-Type','application/json');
        
        return this.http.post('https://lab5-rabdulah.c9users.io:8081/api/re-verification-email ', user, {headers: headers})
            .map(res => res.json());
    }
  
  returnEmail(){
    return (localStorage.getItem("user"));
  }
}
