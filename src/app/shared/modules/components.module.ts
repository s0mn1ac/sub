/* Angular Modules */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/* Ionic Modules */
import { IonicModule } from '@ionic/angular';

/* Other Modules */
import { TranslocoModule } from '@ngneat/transloco';

/* Components */
import { SubCardComponent } from 'src/app/components/subscription-card/sub-card.component';

@NgModule({
  declarations: [
    SubCardComponent
  ],
  exports: [
    SubCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslocoModule
  ]
})
export class ComponentsModule { }
