import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FavouriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavouriteProvider {

  favourites: Array<any>;

  constructor(public http: HttpClient) {
    console.log('Hello FavouriteProvider Provider');
    this.favourites = [];
  }

  addFavourite(id: number):boolean{
    this.favourites.push(id);
    return true;
  }
  isFavourite(id: number):boolean{    
    return this.favourites.some(el => el===id);
  }

}
