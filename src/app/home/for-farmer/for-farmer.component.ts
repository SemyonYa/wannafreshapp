import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-for-farmer',
  templateUrl: './for-farmer.component.html',
  styleUrls: ['./for-farmer.component.scss'],
})
export class ForFarmerComponent implements OnInit {
  items: string[] = [];
  constructor(private dataService: DataService, private modalController: ModalController) { }

  ngOnInit() {
    this.items = this.dataService.forFarmer;
  }

  close() {
    this.modalController.dismiss();
  }

}
