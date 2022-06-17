/* Angular Modules */
import { NgModule } from '@angular/core';
import { DateFormatPipe } from '../pipes/date-format.pipe';

/* Pipes */
import { DaysUntilPipe } from '../pipes/days-until.pipe';

@NgModule({
  declarations: [
    DaysUntilPipe,
    DateFormatPipe
  ],
  exports: [
    DaysUntilPipe,
    DateFormatPipe
  ],
  imports: []
})
export class PipesModule { }
