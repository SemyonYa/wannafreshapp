import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { Farmer } from 'src/app/_models/farmer';
import { Promo } from 'src/app/_models/promo';
import { blockAnimation } from 'src/app/_helper/block-animation';
import { PromoComponent } from 'src/app/farmer/promo/promo.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [blockAnimation]
})
export class CategoryComponent implements OnInit {
  categoryId: number;
  category: Category;
  farmers: Farmer[] = [];
  promos: Promo[] = [];
  view = 'farmers';
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private modalController: ModalController) { }

  ngOnInit() {
    this.categoryId = this.activatedRoute.snapshot.params.categoryId;
    this.dataService.categories$
      .subscribe(
        (data: Category[]) => {
          this.category = data.find(c => c.id == this.categoryId);
          this.dataService.farmers$
            .subscribe(
              (data: Farmer[]) => {
                this.farmers = data.filter(f => f.categories.filter(c => c.id == this.categoryId).length > 0);
                this.promos = [];
                data.forEach(f => {
                  f.promos.forEach(p => {
                    if (p.categoryId == this.categoryId) {
                      p.fillFarmerData(f.name, f.thumb);
                      this.promos.push(p);
                    }
                  });
                });
              }
            );

        }
      );
  }

  toggleView(e: CustomEvent) {
    this.view = e.target['value'];
  }

  async showPromo(promo: Promo) {
    const modal = await this.modalController.create({
      component: PromoComponent,
      componentProps: { promo },
      cssClass: 'promo-modal'
    });
    return await modal.present();
  }
}