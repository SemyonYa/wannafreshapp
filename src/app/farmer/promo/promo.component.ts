import { Component, OnInit, Input } from '@angular/core';
import { Promo } from 'src/app/_models/promo';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
})
export class PromoComponent implements OnInit {
  @Input() promo: Promo;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

}
