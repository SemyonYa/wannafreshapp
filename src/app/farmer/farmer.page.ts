import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { CartService } from '../_services/cart.service';
import { Farmer } from '../_models/farmer';
import { ActivatedRoute } from '@angular/router';
import { Good } from '../_models/good';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.page.html',
  styleUrls: ['./farmer.page.scss'],
})
export class FarmerPage implements OnInit {
  id: number;
  farmer: Farmer;
  // goodCount: number = 100;
  constructor(private dataService: DataService, private cartService: CartService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.dataService.farmers$
      .subscribe(
        (data: Farmer[]) => {
          this.farmer = data.find(f => f.id == this.id);
          // if (this.farmer) {
          //   this.dataService.getFarmerGoods(this.id)
          //     .subscribe(
          //       (data: Good[]) => {
          //         this.farmer.fillGoods(data);
          //       }
          //     );
          // }
        }
      );
  }

}
