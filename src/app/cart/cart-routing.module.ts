import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartPage } from './cart.page';
import { InComponent } from './in/in.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { SubmitComponent } from './submit/submit.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPage,
    children: [
      { path: '', component: InComponent, pathMatch: 'full' },
      { path: 'order-form', component: OrderFormComponent },
      { path: 'submit', component: SubmitComponent },
      { path: 'success', component: SuccessComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartPageRoutingModule { }
