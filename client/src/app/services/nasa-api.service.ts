import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class NasaApiService {
    
result:any;
 list: string[] = [];

private NASAquery = "https://images-api.nasa.gov/search?q=";
  constructor(private _http: Http) { }

getValues(query){
    //console.log(index);
    return this._http.get(this.NASAquery + query)
    .map((data: any) => data.json());//.collection.items["0"].links["0"].href);
}
}