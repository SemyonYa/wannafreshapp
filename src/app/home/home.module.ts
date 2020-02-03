import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ContactComponent } from './contact/contact.component';
import { ForFarmerComponent } from './for-farmer/for-farmer.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    ContactComponent,
    ForFarmerComponent,
    TermsComponent
  ],
  entryComponents: [
    ContactComponent,
    ForFarmerComponent,
    TermsComponent
  ]
})
export class HomePageModule {}
