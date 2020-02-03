import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Farmer } from 'src/app/_models/farmer';
import { CartService } from 'src/app/_services/cart.service';
import { Good } from 'src/app/_models/good';
import { GoodInCart } from 'src/app/_models/good-in-cart';
import { AlertController, ModalController } from '@ionic/angular';
import { GoodComponent } from '../good/good.component';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
})
export class GoodsComponent implements OnInit {
  modalIon: HTMLIonModalElement;
  farmerId: number;
  farmer: Farmer;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private cartService: CartService, private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    this.farmerId = this.activatedRoute.snapshot.parent.params.id;
    const goodsInCart: GoodInCart[] = this.cartService.getGoodsFromStorage();
    this.dataService.farmers$
      .subscribe(
        (data: Farmer[]) => {
          this.farmer = data.find(f => f.id == this.farmerId);
          if (this.farmer) {
            this.farmer.categories.forEach(c => {
              c.goods.forEach(
                (g: Good) => {
                  const goodInCart: GoodInCart = goodsInCart.find(gc => gc.id == g.id);
                  if (goodInCart) {
                    g.setQuantityInCart(goodInCart.quantityInCart);
                  }
                });
            });
          }
        }
      );
  }

  async showGood(good: Good) {
    this.modalIon = await this.modalController.create({
      component: GoodComponent,
      componentProps: {
        good
      },
      cssClass: 'modal-good'
    });
    // this.modalIon.onDidDismiss().then(
    //   (returned: any) => {
    //     console.log('data', returned.data);
    //     alert('Current Quantity - ' + returned.data.good.quantityInCart);
    //   }
    // );
    return await this.modalIon.present();
  }

  // plus(good: Good) {
  //   // this.checkFarmer(good, 'plus');
  //   this.farmer
  //     .categories.find(c => c.id == good.categoryId)
  //     .goods.find(g => g.id == good.id)
  //     .quantityInCartIncr()
  //   this.cartService.setOne(good);
  // }

  // minus(good: Good) {
  //   // this.checkFarmer(good, 'minus');
  //   this.farmer
  //     .categories.find(c => c.id == good.categoryId)
  //     .goods.find(g => g.id == good.id)
  //     .quantityInCartDecr();
  //   this.cartService.setOne(good);
  // }

  toCart(good: Good, func: string) {
    if (this.cartService.farmerId$.value != good.farmerId && this.cartService.farmerId$.value != 0) {
      this.newFarmerMessage(good, func);
    } else {
      this.plusMinus(good, func);
    }
  }

  plusMinus(good: Good, func: string) {
    if (func === 'plus') {
      this.farmer
        .categories.find(c => c.id == good.categoryId)
        .goods.find(g => g.id == good.id)
        .quantityInCartIncr()
      this.cartService.setOne(good);
    } else if (func === 'minus') {
      this.farmer
        .categories.find(c => c.id == good.categoryId)
        .goods.find(g => g.id == good.id)
        .quantityInCartDecr();
      this.cartService.setOne(good);
    }
  }

  async newFarmerMessage(good: Good, func: string) {
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
            this.plusMinus(good, func);
          }
        }]
    });

    await alert.present();
  }

}

