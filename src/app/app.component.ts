import { Component, ViewEncapsulation, OnChanges } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './_services/data.service';
import { CartService } from './_services/cart.service';
import { GoodInCart } from './_models/good-in-cart';
import { Router, NavigationEnd } from '@angular/router';
import { btnHomeAnimation } from './_helper/btn-home-animation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [btnHomeAnimation]
})
export class AppComponent {
  cartCounter: number = 0;
  isHome = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private cartService: CartService,
    private router: Router,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.cartService.init();
      this.dataService.getCategories();
      this.cartService.cartItems$
        .subscribe(
          (cartItems: GoodInCart[]) => {
            this.cartCounter = cartItems.length;
          }
        );
      this.router.events
        .subscribe(
          (e) => {
            if (e instanceof NavigationEnd) {
              this.isHome = this.router.url === "/home";
              this.modalController.getTop().then(
                (modal) => {
                  if (modal !== undefined) {
                    this.modalController.dismiss();
                  }
                }
              )
            }
          }
        );
      this.dataService.getFarmersFull();
      this.splashScreen.hide();
    });
  }

}
