import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { InComponent } from './in/in.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { SubmitComponent } from './submit/submit.component';
import { SuccessComponent } from './success/success.component';
import { EditQuantityComponent } from './edit-quantity/edit-quantity.component';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CartPageRoutingModule
  ],
  declarations: [
    CartPage,
    InComponent,
    OrderFormComponent,
    SubmitComponent,
    SuccessComponent,
    EditQuantityComponent
  ],
  entryComponents: [
    EditQuantityComponent
  ]
})
export class CartPageModule {}
