import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerPageRoutingModule } from './farmer-routing.module';

import { FarmerPage } from './farmer.page';
import { GoodComponent } from './good/good.component';
import { GoodsComponent } from './goods/goods.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { PromoComponent } from './promo/promo.component';
import { PromosComponent } from './promos/promos.component';
import { VideosComponent } from './videos/videos.component';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerPageRoutingModule
  ],
  declarations: [
    FarmerPage,
    DescriptionComponent,
    GoodComponent,
    GoodsComponent,
    PostComponent,
    PostsComponent,
    PromoComponent,
    PromosComponent,
    VideosComponent
  ],
  entryComponents: [
    GoodComponent,
    PromoComponent
  ]
})
export class FarmerPageModule {}
