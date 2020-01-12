import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Farmer } from '../_models/farmer';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Category } from '../_models/category';
import { Promo } from '../_models/promo';
import { Good } from '../_models/good';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  farmers$ = new BehaviorSubject<Farmer[]>([]);
  categories$ = new BehaviorSubject<Category[]>([]);
  // promos$ = new BehaviorSubject<Promo[]>([]);

  constructor(private http: HttpClient) { }

  getFarmers() {
    this.http.get(environment.host + '/data/farmers')
      .pipe(
        map(
          (data: any[]) => data.map(f => new Farmer(f.id, f.name, f.description, f.email, f.min_cost, f.delivery, f.img))
        )
      )
      .subscribe(
        (data: Farmer[]) => {
          this.farmers$.next(data);
        }
      );
  }

  getCategories() {
    this.http.get(environment.host + '/data/categories')
      .pipe(
        map(
          (data: any[]) => data.map(c => new Category(c.id, c.name, c.img))
        )
      )
      .subscribe(
        (data: Category[]) => {
          this.categories$.next(data);
        }
      );
  }

  getPromos() {
    return this.http.get(environment.host + '/data/promos')
      .pipe(
        map(
          (data: any[]) => data.map(p => new Promo(p.id, p.title, p.subtitle, p.description, p.img, p.farmer_id))
        )
      );
  }

  getFarmerGoods(id: number) {
    return this.http.get(environment.host + '/data/farmer-goods?farmer_id=' + id)
      .pipe(
        map(
          (data: any[]) => data.map(g => new Good(g.id, g.name, g.brief, g.description, g.farmer_id, g.farmer_name, g.category_id, g.category_name, g.price, g.quantity, g.measure, g.img))
        )
      );
      // .subscribe(
      //   (data: Good[]) => {
      //     const fs = this.farmers$.value;
      //     fs.find(f => f.id == id).fillGoods(data);
      //     this.farmers$.next(fs);
      //   }
      // );
  }

  // getFarmer(id: number): Farmer {
  //   // console.log(this.farmers$.value);
  //   let farmer: Farmer = null;
  //   this.farmers$.subscribe(
  //     (data) => {
  //       farmer = data.find(f => f.id === id);
  //     }
  //   );
  //   return farmer;
  //   // return this.farmers$.value.find(f => f.id === id);
  // }
}
