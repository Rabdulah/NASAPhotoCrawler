import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){ //make sure the user makes a field for email and password
    if(user.email == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }
    
    validateCollection(collection){ //collections should have a title
        if(collection.title==undefined){
        return false;
        }else{
            return true;
        }
    }

  validateEmail(email){ //makesure the email is a valid input
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

