import { Component, OnInit } from '@angular/core';
import { Farmer } from 'src/app/_models/farmer';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/_models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  farmerId: number;
  farmer: Farmer;
  postId: number;
  post: Post;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.farmerId = this.activatedRoute.snapshot.parent.params.id;
    this.postId = this.activatedRoute.snapshot.params.postId;
    this.dataService.farmers$
      .subscribe(
        (data: Farmer[]) => {
          this.farmer = data.find(f => f.id == this.farmerId);
          this.post = this.farmer.posts.find(p => p.id == this.postId);
        }
      );
  }

}
