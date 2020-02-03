import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../_services/data.service';
import { BehaviorSubject } from 'rxjs';
import { Farmer } from '../_models/farmer';
import { Category } from '../_models/category';
import { Promo } from '../_models/promo';
import { Router } from '@angular/router';
import { PromoComponent } from '../farmer/promo/promo.component';
import { ModalController } from '@ionic/angular';
import { ForFarmerComponent } from './for-farmer/for-farmer.component';
import { TermsComponent } from './terms/terms.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  farmers: Farmer[] = [];
  categories$: BehaviorSubject<Category[]>;
  promos: Promo[] = [];
  searchingIsActive = false;
  searchingResult: Farmer[] = [];

  constructor(private dataService: DataService, private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    this.dataService.farmers$
      .subscribe(
        (data: Farmer[]) => {
          this.farmers = data;
          // console.log('farmers', this.farmers);
        }
      );
    this.categories$ = this.dataService.categories$;
    this.dataService.getPromos()
      .subscribe(
        (data: Promo[]) => {
          this.promos = data;
        }
      );
    this.dataService.getForFarmer();
    this.dataService.getTerms();
  }

  searching(e: CustomEvent) {
    const text = (e.target['value'] as string).toLowerCase().trim();
    this.searchingIsActive = text.length > 1;
    this.searchingResult = this.farmers.filter(f => f.name.toLowerCase().indexOf(text) > -1);
    console.log("TCL: HomePage -> searching -> text", text)
  }

  searchingOut(e: KeyboardEvent) {
    const text = (e.target['value'] as String).toLowerCase().trim();
    if (text.length > 1) {
      this.router.navigateByUrl('/search/farmers?text=' + text);
    }
  }

  searchHide() {
    this.searchingIsActive = false;
  }

  async showPromo(promo: Promo) {
    const modal = await this.modalController.create({
      component: PromoComponent,
      componentProps: { promo },
      cssClass: 'promo-modal'
    });
    return await modal.present();
  }

  async showForFarmer() {
    const modal = await this.modalController.create({
      component: ForFarmerComponent,
      cssClass: 'info-modal'
    });
    return await modal.present();
  }

  async showTerms() {
    const modal = await this.modalController.create({
      component: TermsComponent,
      cssClass: 'info-modal'
    });
    return await modal.present();
  }

  async showContact() {
    const modal = await this.modalController.create({
      component: ContactComponent,
      cssClass: 'info-modal'
    });
    return await modal.present();
  }
}
