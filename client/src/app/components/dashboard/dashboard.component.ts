import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
//import { DataService } from '../data.service';
import {Router} from '@angular/router';
import { NasaApiService } from '../../services/nasa-api.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private nasaApiService: NasaApiService) { }
  //constructor(private http: Http) { }
searchPhoto = "";
userStatus = "";
photos: any [];
results;
specific="";
collection: any [];

handleSuccess(data)
{
this.photos = data.collection.items;
console.log(data.collection.items);
console.log(data.collection.items[0].links[0]["href"]);
}

search(searchPhoto){
  this.nasaApiService.getValues(this.searchPhoto)
  .subscribe(
        (data: any) => this.handleSuccess(data),
        );
}
addToCollection(){
  
  console.log('1')
}

  ngOnInit() {
  }

}