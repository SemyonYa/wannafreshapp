import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';
import { FarmersComponent } from './farmers/farmers.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchPage,
    children: [
      { path: 'farmers', component: FarmersComponent },
      { path: 'category/:categoryId', component: CategoryComponent }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
