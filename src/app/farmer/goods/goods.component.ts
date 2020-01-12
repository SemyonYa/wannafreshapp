import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { Good } from 'src/app/_models/good';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { Farmer } from 'src/app/_models/farmer';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
})
export class GoodsComponent implements OnInit {
  farmerId: number;
  farmer: Farmer;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.farmerId = this.activatedRoute.snapshot.parent.params.id;
    this.dataService.farmers$
      .subscribe(
        (data: Farmer[]) => {
          this.farmer = data.find(f => f.id == this.farmerId);
        }
      );
  }

}
