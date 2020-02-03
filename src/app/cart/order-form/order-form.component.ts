import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/_models/client';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  form: FormGroup;
  client: Client;
  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.client = this.cartService.client$.value;
    this.form = new FormGroup({
      name: new FormControl(this.client.name, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      phone: new FormControl(this.client.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/[0-9]{10}/)]),
      email: new FormControl(this.client.email, [Validators.required, Validators.email, Validators.maxLength(40)]),
      address: new FormControl(this.client.address),
      description: new FormControl(this.client.description),
    }
    );
  }

  submit() {
    this.cartService.client$.next(this.form.value as Client);
    // alert(JSON.stringify(this.cartService.client$.value));
    this.router.navigateByUrl('/cart/submit');
  }


}
