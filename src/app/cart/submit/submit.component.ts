import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { GoodInCart } from 'src/app/_models/good-in-cart';
import { Order } from 'src/app/_models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class SubmitComponent implements OnInit {
  form: FormGroup;
  constructor(private cartService: CartService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern(/[0-9]{6}/)])
    });
  }

  submit() {
    // const goodsInCart: GoodInCart[] = this.cartService.cartItems$.value;
    // const farmerId: number = this.cartService.farmerId$.value;
    // console.log('cart submit', goodsInCart);
    // console.log('farmer submit', farmerId);
    const order: Order = new Order(this.cartService.farmerId$.value, this.cartService.cartItems$.value, this.cartService.client$.value);
    console.log('Order submit', order);
    this.router.navigateByUrl('/cart/success');
  }

}
