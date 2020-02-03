import { Component, OnInit, Input } from '@angular/core';
import { GoodInCart } from 'src/app/_models/good-in-cart';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { Good } from 'src/app/_models/good';
import { Farmer } from 'src/app/_models/farmer';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-quantity',
  templateUrl: './edit-quantity.component.html',
  styleUrls: ['./edit-quantity.component.scss'],
})
export class EditQuantityComponent implements OnInit {
  @Input() goodInCart: GoodInCart;
  good: Good;
  constructor(private cartService: CartService, private dataService: DataService, private modalController: ModalController) { }
  
  ngOnInit() {
    
    console.log("TCL: EditQuantityComponent -> goodInCart", this.goodInCart)
    this.dataService.farmers$
      .subscribe(
        (data: Farmer[]) => {
          this.good = data.find(f => f.id == this.goodInCart.farmerId)
            .categories.find(c => c.id == this.goodInCart.categoryId)
            .goods.find(g => g.id == this.goodInCart.id);
        }
      );
  }

  minus() {
    this.good.quantityInCartDecr();
    this.cartService.setOne(this.good);
    if (this.good.quantityInCart <= 0) {
      this.modalController.dismiss();
    }
  }

  plus() {
    this.good.quantityInCartIncr();
    this.cartService.setOne(this.good);
  }
  
  remove() {
    this.good.setQuantityInCart(0);
    this.cartService.setOne(this.good);
    this.modalController.dismiss();
  }

  close() {
    this.modalController.dismiss();
  }
}
