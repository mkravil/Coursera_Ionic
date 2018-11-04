import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Http } from '@angular/http';

/*
  Generated class for the FavouriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavouriteProvider {

  favourites: Array<any>;

  constructor(public http: Http,
    private dishservice: DishProvider) {
    console.log('Hello FavouriteProvider Provider');
    this.favourites = [];
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => 
        this.favourites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favourites.indexOf(id);
    if (index >= 0) {
      this.favourites.splice(index,1);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

  addFavorite(id: number): boolean {
    if (!this.isFavourite(id))
      this.favourites.push(id);
    console.log('favorites', this.favourites);
    return true;
  }

  isFavourite(id: number):boolean{    
    return this.favourites.some(el => el===id);
  }

}
