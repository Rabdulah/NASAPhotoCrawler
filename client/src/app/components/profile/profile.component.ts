import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { NasaApiService } from '../../services/nasa-api.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { CollectionService } from '../../services/collection.service';
import {ValidateService} from '../../services/validate.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:any;
email: String;
searchPhoto: String;
collectionTitle: String;
collectionDescrip: String;
isPublic: Boolean = false;
imageList: String;
count:number;
//searchPhoto = "";
//userStatus = "";
photos: any [];
image: any [];
  constructor(private authService: AuthService, 
  private router: Router, 
  private nasaApiService: NasaApiService, 
  private collectionService: CollectionService,  
  private flashMessagesService: FlashMessagesService,
  private validateService : ValidateService
  ) {
    
    this.count=0;
    this.image=[];
    }

  onCollectionSubmit(){
    var thing = (this.authService.returnEmail());
    var splitter = thing.split('"email":"');
    var userEmail = splitter[1].split('"}') //makes sure we get the email portion of the object
    const collection = {
      email: userEmail[0], 
      searchPhoto: this.searchPhoto,
      title: this.collectionTitle,
      descrip: this.collectionDescrip,
      isPublic: this.isPublic,
      imageList: this.image
    }
    if(this.validateService.validateCollection(collection)){ //check if user wrote a title
    this.makeCollection(collection);
    }else{ 
    this.flashMessagesService.show('Please make a title',  {
      classes: ['alert', 'alert-danger'],
      timeout: 3000, // Default is 3000;
    });
}
    

  }
    
handleSuccess(data)
{
this.photos = data.collection.items;
console.log(data.collection.items);
console.log(data.collection.items[0].links[0]["href"]);
};

search(searchPhoto){
  this.nasaApiService.getValues(this.searchPhoto)
  .subscribe(
        (data: any) => this.handleSuccess(data),
        );
};

makeCollection(collection){ //
  console.log(collection.email + "Inside makeCollection");
  this.collectionService.sendCollection(collection).subscribe(data => { //send to collection service to make collection
      if(data.success){
      this.flashMessagesService.show('You have made an image collection!',  {
      classes: ['alert', 'alert-success'], 
      timeout: 3000, 
    });
      } else{
      this.flashMessagesService.show('Collection creation failed',  {
      classes: ['alert', 'alert-danger'], 
      timeout: 3000, 
    });
      }
  });
      
  console.log("2")
  this.image=[]; //empty collection so user can create new one
  this.count = 0;
}
addToCollection(photo){
  console.log(photo.links[0].href);
    this.image[this.count]=photo.links[0].href;
    this.count++;

  
}
ngOnInit() {}
}
