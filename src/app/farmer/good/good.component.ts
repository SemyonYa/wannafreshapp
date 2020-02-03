import { Component, OnInit, Input } from '@angular/core';
import { Good } from 'src/app/_models/good';
import { ModalController, AlertController } from '@ionic/angular';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.scss'],
})
export class GoodComponent implements OnInit {
  @Input() good: Good;
  constructor(private modalController: ModalController, private cartService: CartService, private alertController: AlertController, private dataService: DataService) { }

  ngOnInit() { }

  hide() {
    this.modalController.dismiss();
  }

  toCart(func: string) {
    if (this.cartService.farmerId$.value != this.good.farmerId && this.cartService.farmerId$.value != 0) {
      this.newFarmerMessage(func);
    } else {
      this.plusMinus(func);
    }
  }

  plusMinus(func: string) {
    if (func === 'plus') {
      this.good.quantityInCartIncr()
      this.cartService.setOne(this.good);
    } else if (func === 'minus') {
      this.good.quantityInCartDecr();
      this.cartService.setOne(this.good);
    }
  }

  async newFarmerMessage(func: string) {
    const m = 'В корзину уже добавлены товары из другого фермерского хозяйства. Если продолжить добавление, ранее добавленные товары будут удалены. Продолжить?';
    const alert = await this.alertController.create({
      header: 'Предупреждение!',
      message: m,
      cssClass: 'text-center',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'text-center'
        }, {
          text: 'Да, очистить корзину, и начать добавление товаров заново',
          handler: () => {
            this.cartService.clear();
            this.dataService.resetFarmers();
            this.plusMinus(func);
          }
        }]
    });

    await alert.present();
  }
}
