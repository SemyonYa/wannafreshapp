import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { CartService } from '../_services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Farmer } from '../_models/farmer';
import { Category } from '../_models/category';
import { Promo } from '../_models/promo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  farmers: Farmer[] = [];
  categories$: BehaviorSubject<Category[]>;
  promos: Promo[] = [];
  constructor(private dataService: DataService, private cartService: CartService) { }

  ngOnInit() {
    this.dataService.farmers$
      .subscribe(
        (data: Farmer[]) => {
          this.farmers = data;
        }
      );
    this.dataService.getCategories();
    this.categories$ = this.dataService.categories$;
    this.dataService.getPromos()
      .subscribe(
        (data: Promo[]) => {
          this.promos = data;
        }
      );
  }
}
