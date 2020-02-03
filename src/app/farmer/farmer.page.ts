import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Farmer } from '../_models/farmer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.page.html',
  styleUrls: ['./farmer.page.scss'],
})
export class FarmerPage implements OnInit {
  id: number;
  farmer: Farmer;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.dataService.farmers$
      .subscribe(
        (data: Farmer[]) => {
          this.farmer = data.find(f => f.id == this.id);
        }
      );
  }

}
