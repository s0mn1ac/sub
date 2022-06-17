/* Angular Modules */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/* Ionic Modules */
import { IonicModule } from '@ionic/angular';

/* Other Modules */
import { TranslocoModule } from '@ngneat/transloco';

/* Components */
import { SubCardComponent } from 'src/app/components/sub-card/sub-card.component';
import { SubCardSkeletonComponent } from 'src/app/components/skeletons/sub-card-skeleton/sub-card-skeleton.component';
import { PipesModule } from './pipes.module';

@NgModule({
  declarations: [
    SubCardComponent,
    SubCardSkeletonComponent
  ],
  exports: [
    SubCardComponent,
    SubCardSkeletonComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslocoModule,
    PipesModule
  ]
})
export class ComponentsModule { }
