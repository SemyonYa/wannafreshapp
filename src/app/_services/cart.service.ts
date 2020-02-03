import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Good } from '../_models/good';
import { GoodInCart } from '../_models/good-in-cart';
import { Client } from '../_models/client';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CART = "wfCart";
  FARMER = 'wfFarmer';
  farmerId$: BehaviorSubject<number>;
  cartItems$: BehaviorSubject<GoodInCart[]>;
  client$: BehaviorSubject<Client>;
  orderId$: BehaviorSubject<number>;
  constructor() { }

  init() {
    this.cartItems$ = new BehaviorSubject<GoodInCart[]>([]);
    this.cartItems$.next(this.getGoodsFromStorage());
    this.farmerId$ = new BehaviorSubject<number>(0);
    this.farmerId$.next(this.getFarmerFromStorage());
    this.client$ = new BehaviorSubject<Client>(new Client());
  }

  getGoodsFromStorage(): GoodInCart[] {
    let goods: GoodInCart[] = [];
    goods = JSON.parse(localStorage.getItem(this.CART)) ? JSON.parse(localStorage.getItem(this.CART)) : [];
    return goods;
  }

  getFarmerFromStorage(): number {
    return JSON.parse(localStorage.getItem(this.FARMER)) ? JSON.parse(localStorage.getItem(this.FARMER)) as number : 0;
  }

  setGoodsToStorage(goods: GoodInCart[]) {
    localStorage.setItem(this.CART, JSON.stringify(goods));
  }

  setFarmerToStorage(farmerId: number) {
    localStorage.setItem(this.FARMER, JSON.stringify(farmerId));
  }

  setMany(goods: GoodInCart[]) {
    if (goods.length === 0) {
      this.setFarmerToStorage(0);
      this.farmerId$.next(0);
    }
    this.setGoodsToStorage(goods);
    this.cartItems$.next(goods);
  }

  setOne(good: Good) {
    this.setFarmerToStorage(good.farmerId);
    this.farmerId$.next(good.farmerId);
    let goods: GoodInCart[] = this.cartItems$.value;
    const foundGood = goods.find(x => x.id == good.id);
    if (foundGood === undefined) {
      if (good.quantityInCart > 0) {
        goods.push(new GoodInCart(good));
      }
    } else {
      if (good.quantityInCart > 0) {
        foundGood.quantityInCart = good.quantityInCart;
      } else {
        goods.splice(goods.indexOf(foundGood), 1);
      }
    }
    this.setMany(goods);
  }

  clear() {
    this.setMany([]);

    // this.dataService.resetFarmers();
  }
}
