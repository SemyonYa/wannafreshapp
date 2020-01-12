import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { Good } from 'src/app/_models/good';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
})
export class GoodsComponent implements OnInit {
  farmerId: number;
  categories: Category[];
  goods: Good[] = [];
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.farmerId = this.activatedRoute.snapshot.parent.params.id;
    this.dataService.categories$
      .subscribe(
        (data: Category[]) => {
          this.categories = data;
          if (this.categories.length > 0) {
            this.dataService.getFarmerGoods(this.farmerId)
              .subscribe(
                (data2: Good[]) => {
                  data2.forEach(good => {
                    this.categories.find(c => c.id == good.categoryId).goods.splice(0).push(good);
                  });
                }
              );

          }
        }
      );
  }

}
