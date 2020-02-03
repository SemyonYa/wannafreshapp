import { Component, OnInit } from '@angular/core';
import { Farmer } from 'src/app/_models/farmer';
import { GoodInCart } from 'src/app/_models/good-in-cart';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { EditQuantityComponent } from '../edit-quantity/edit-quantity.component';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.scss'],
})
export class InComponent implements OnInit {
  sum: number = 0;
  goodsInCart: GoodInCart[] = [];
  farmerId: number;
  farmer: Farmer;
  constructor(private cartService: CartService, private dataService: DataService, private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    // this.cartService.farmerId$.value
    console.log("TCL: InComponent -> ngOnInit -> this.cartService.farmerId$.value", this.cartService.farmerId$.value)
    console.log("TCL: InComponent -> ngOnInit -> this.cartService.cartItems$.value", this.cartService.cartItems$.value)
    this.cartService.cartItems$
      .subscribe(
        (cartItems: GoodInCart[]) => {
          this.goodsInCart = cartItems;
          cartItems.forEach(g => {
            this.sum = 0;
            this.sum += g.quantityInCart * g.price;
          })
        }
      );
    this.cartService.farmerId$
      .subscribe(
        (fId: number) => {
          this.farmerId = fId;
          this.dataService.farmers$
            .subscribe(
              (fs: Farmer[]) => {
                this.farmer = fs.find(f => f.id == this.farmerId)
              }
            );
        }
      );
  }

  async clear() {
    const alert = await this.alertController.create({
      header: 'Предупреждение!',
      message: 'Действительно очистить корзину?',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Да',
          handler: () => {
            this.cartService.clear();
            this.dataService.resetFarmers();
          }
        }
      ]
    });

    await alert.present();
  }

  async editQuantity(goodInCart: GoodInCart) {
    const modal = await this.modalController.create({
      component: EditQuantityComponent,
      componentProps: { goodInCart },
      cssClass: 'edit-quantity-modal'
    });
    return await modal.present();
  }

  submit() {
    alert('Подтверждаем');
  }

}
