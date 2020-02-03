import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  items: string[] = [];
  constructor(private dataService: DataService, private modalController: ModalController) { }

  ngOnInit() {
    this.items = this.dataService.terms;
  }

  close() {
    this.modalController.dismiss();
  }

}
