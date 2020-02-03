import { Component, OnInit } from '@angular/core';
import { Farmer } from 'src/app/_models/farmer';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Promo } from 'src/app/_models/promo';
import { ModalController } from '@ionic/angular';
import { PromoComponent } from '../promo/promo.component';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss'],
})
export class PromosComponent implements OnInit {
  farmerId: number;
  farmer: Farmer;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private modalController: ModalController) { }

  ngOnInit() {
    this.farmerId = this.activatedRoute.snapshot.parent.params.id;
    this.dataService.farmers$
      .subscribe(
        (data: Farmer[]) => {
          this.farmer = data.find(f => f.id == this.farmerId);
        }
      );
  }

  async show(promo: Promo) {
    const modal = await this.modalController.create({
      component: PromoComponent,
      componentProps: { promo },
      cssClass: 'promo-modal'
    });
    return await modal.present();
  }

}
