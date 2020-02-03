import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { Farmer } from 'src/app/_models/farmer';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.scss'],
})
export class FarmersComponent implements OnInit {
  text = '';
  farmers: Farmer[];
  farmers2: Farmer[];
  full = false;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.farmers$
      .subscribe(
        (farmers: Farmer[]) => {
          this.activatedRoute.queryParams
            .subscribe(
              (params: any) => {
                if (params['text']) {
                  this.text = params['text'];
                  this.farmers = farmers.filter(f => f.name.toLowerCase().indexOf(this.text) > -1);
                  farmers
                    .filter(f => f.categories.filter(c => c.goods.filter(g => g.name.toLowerCase().indexOf(this.text) > -1).length > 0).length > 0)
                    .forEach(f => this.farmers.push(f));
                  this.full = false;
                } else {
                  this.farmers = farmers;
                  this.full = true;
                }
              }
            );
        }
      );
  }

}
