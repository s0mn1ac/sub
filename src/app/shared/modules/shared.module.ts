/* Angular modules */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Ionic modules */
import { IonicModule } from '@ionic/angular';

/* Other modules */
import { TranslocoModule } from '@ngneat/transloco';

/* App modules */
import { ComponentsModule } from './components.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule
  ],
  exports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule
  ],
  providers: []
})
export class SharedModule { }
