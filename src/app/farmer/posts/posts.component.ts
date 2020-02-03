import { Component, OnInit } from '@angular/core';
import { Farmer } from 'src/app/_models/farmer';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
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

  more(id: number) {
    alert('More about post #' + id);
  }

}
