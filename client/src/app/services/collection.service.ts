import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class CollectionService {
private databaseURL = "https://lab5-rabdulah.c9users.io:8081/api";
 
  constructor(private http:Http) { }

getUserCollections(email:String){
  return this.http.get(this.databaseURL+email);
}

sendCollection(collection){
    console.log("3");
    console.log(collection.email + "Inside sendcollection");
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.databaseURL + '/collection', collection,{headers: headers})
      .map(res => res.json());
  }

}
