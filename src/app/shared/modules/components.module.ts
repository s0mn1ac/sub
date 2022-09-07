/* Angular Modules */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/* Ionic Modules */
import { IonicModule } from '@ionic/angular';
import { PipesModule } from './pipes.module';

/* Other Modules */
import { TranslocoModule } from '@ngneat/transloco';

/* Components */
import { ColorSelectorComponent } from 'src/app/components/color-selector/color-selector.component';
import { LogoSelectorComponent } from 'src/app/components/logo-selector/logo-selector.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PriceContainerComponent } from 'src/app/components/price-container/price-container.component';
import { SubCardComponent } from 'src/app/components/sub-card/sub-card.component';
import { SubCardSkeletonComponent } from 'src/app/components/skeletons/sub-card-skeleton/sub-card-skeleton.component';

@NgModule({
  declarations: [
    ColorSelectorComponent,
    LogoSelectorComponent,
    ModalComponent,
    PriceContainerComponent,
    SubCardComponent,
    SubCardSkeletonComponent
  ],
  exports: [
    ColorSelectorComponent,
    LogoSelectorComponent,
    ModalComponent,
    PriceContainerComponent,
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
