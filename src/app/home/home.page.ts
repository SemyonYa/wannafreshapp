import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { CartService } from '../_services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Farmer } from '../_models/farmer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  farmers$: BehaviorSubject<Farmer[]>;
  constructor(private dataService: DataService, private cartService: CartService) {}

  ngOnInit() {
    this.farmers$ = this.dataService.farmers$;
  }
}
