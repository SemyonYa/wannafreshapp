import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Farmer } from '../_models/farmer';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Category } from '../_models/category';
import { Promo } from '../_models/promo';
import { Good } from '../_models/good';
import { Post } from '../_models/post';
import { Video } from '../_models/video';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  farmers$ = new BehaviorSubject<Farmer[]>([]);
  categories$ = new BehaviorSubject<Category[]>([]);
  isHome$ = new BehaviorSubject<boolean>(true);
  forFarmer: string[] = [];
  terms: string[] = [];

  constructor(private http: HttpClient) { }

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
          (data: any[]) => data.map(p => new Promo(p.id, p.title, p.subtitle, p.description, p.img, p.farmer_id, p.category_id, p.farmer_name, p.farmer_img))
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
                const categories: Category[] = [];
                (item.categories as any[]).forEach(
                  item2 => {
                    const category = new Category(item2.category.id, item2.category.name, item2.category.img);
                    const goods: Good[] = [];
                    (item2.goods as any[]).forEach(
                      g => {
                        const good = new Good(g.id, g.name, g.brief, g.description, g.farmer_id, g.category_id, g.price, g.quantity, g.measure, g.img);
                        goods.push(good);
                        farmer.goodCounter++;
                      }
                    );
                    category.fillGoods(goods);
                    categories.push(category);
                  }
                );
                const promos: Promo[] = (item.promos as any[]).map(p => new Promo(p.id, p.title, p.subtitle, p.description, p.img, p.farmer_id, p.category_id, p.farmer_name, p.farmer_img));
                const posts: Post[] = (item.posts as any[]).map(p => new Post(p.id, p.title, p.subtitle, p.description, p.img, p.farmer_id));
                const videos: Video[] = (item.videos as any[]).map(v => new Video(v.id, v.title, v.description, v.url, v.farmer_id));
                farmer.fillCategories(categories);
                farmer.fillPromos(promos);
                farmer.fillPosts(posts);
                farmer.fillVideos(videos);
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

  sendOrder(formData: any) {
    alert(JSON.stringify(formData));
  }

  resetFarmers() {
    let currentFarmers: Farmer[] = this.farmers$.value;
    currentFarmers.forEach(f => {
      f.categories.forEach(c => {
        c.goods.forEach(g => {
          g.quantityInCart = 0;
        });
      });
    });
    this.farmers$.next(currentFarmers);
  }

  getForFarmer() {
    return this.http.get(environment.host + '/data/for-farmer')
      .subscribe(
        (data: any[]) => {
          this.forFarmer = data.map(i => i.description);
        }
      );
  }

  getTerms() {
    return this.http.get(environment.host + '/data/terms')
      .subscribe(
        (data: any[]) => {
          this.terms = data.map(i => i.description);
        }
      );
  }
}
