import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
    .pipe(map(dishes => dishes[0]))
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }
}


// getDishes(): Observable<Dish[]> {
//   return of(DISHES).pipe(delay(2000));
// }

// getDish(id: string): Observable<Dish> {
//   return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
// }

// getFeaturedDish(): Observable<Dish> {
//   return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
// }

// getDishIds(): Observable<string[] | any> {
//   return of(DISHES.map(dish => dish.id));
// }


// getDish(id: string): Promise<Dish> {
//   return new Promise(resolve => {
//     // Simulate server latency with 2 second delay
//     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000)
//   });
// }

// getFeaturedDish(): Promise<Dish> {
//   return new Promise(resolve => {
//     // Simulate server latency with 2 second delay
//     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000)
//   });