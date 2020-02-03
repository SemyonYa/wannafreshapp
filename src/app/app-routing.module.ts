import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  // {
  //   path: 'cart',
  //   loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule)
  // },
  // {
  //   path: 'search',
  //   loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  // },
  // {
  //   path: 'farmer',
  //   loadChildren: () => import('./farmer/farmer.module').then( m => m.FarmerPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules,
        useHash: true,
        scrollPositionRestoration: 'enabled'
      },
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
