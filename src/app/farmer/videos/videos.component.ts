import { Component, OnInit } from '@angular/core';
import { Farmer } from 'src/app/_models/farmer';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  farmerId: number;
  farmer: Farmer;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private domSan: DomSanitizer) { }

  ngOnInit() {
    this.farmerId = this.activatedRoute.snapshot.parent.params.id;
    this.dataService.farmers$
      .subscribe(
        (data: Farmer[]) => {
          this.farmer = data.find(f => f.id == this.farmerId);
        }
      );
  }

  getSafeHtml(url: string): SafeHtml {
    return this.domSan.bypassSecurityTrustHtml(url);
  }

}
