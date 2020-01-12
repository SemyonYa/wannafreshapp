import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
  // farmers: Farmer[] = [];
  farmers$ = new BehaviorSubject<Farmer[]>([]);
  categories$ = new BehaviorSubject<Category[]>([]);
  // promos$ = new BehaviorSubject<Promo[]>([]);

  constructor(private http: HttpClient) { }

  getFarmers(): Observable<Farmer[]> {
    return this.http.get(environment.host + '/data/farmers')
      .pipe(
        map(
          (data: any[]) => data.map(f => new Farmer(f.id, f.name, f.description, f.email, f.min_cost, f.delivery, f.img))
        )
      );
    // .subscribe(
    //   (data: Farmer[]) => {
    //     this.farmers$.next(data);
    //   }
    // );
  }

  // setFarmers(fs: Farmer[]) {
  //   this.farmers = fs;
  // }

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

  getFarmersFull() {
    this.http.get(environment.host + '/data/farmers-full')
      .pipe(
        map(
          (data: any[]) => {
            return data.map(
              item => {
                const farmer = new Farmer(item.farmer.id, item.farmer.name, item.farmer.description, item.farmer.email, item.farmer.min_cost, item.farmer.delivery, item.farmer.img);
                // const categoryGoods = new Map<Category, Good[]>();
                const categories: Category[] = [];
                (item.categories as any[]).forEach(
                  item2 => {
                    const category = new Category(item2.category.id, item2.category.name, item2.category.img);
                    const goods: Good[] = [];
                    (item2.goods as any[]).forEach(
                      g => {
                        const good = new Good(g.id, g.name, g.brief, g.description, g.farmer_id, g.price, g.quantity, g.measure, g.img);
                        goods.push(good);
                      }
                    );
                    category.fillGoods(goods);
                    categories.push(category);
                    // categoryGoods.set(category, goods);
                  }
                );
                farmer.fillCategories(categories);
                return farmer;
              }
            );
          }
        )
      )
      .subscribe(
        (data: Farmer[]) => {
          this.farmers$.next(data);
        }
      );
  }
}
