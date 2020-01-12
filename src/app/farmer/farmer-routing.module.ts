import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerPage } from './farmer.page';
import { DescriptionComponent } from './description/description.component';
import { GoodsComponent } from './goods/goods.component';
import { PostsComponent } from './posts/posts.component';
import { PromosComponent } from './promos/promos.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  {
    path: 'farmer/:id',
    component: FarmerPage,
    children: [
      { path: '', redirectTo: 'goods', pathMatch: 'full' },
      { path: 'goods', component: GoodsComponent },
      { path: 'description', component: DescriptionComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'promos', component: PromosComponent },
      { path: 'videos', component: VideosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerPageRoutingModule {}
