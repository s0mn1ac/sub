// Angular modules
import { NgModule } from '@angular/core';

// Other modules
import { SubPageRoutingModule } from './sub-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

// Pages
import { SubPage } from './sub.page';

@NgModule({
  imports: [
    SharedModule,
    SubPageRoutingModule
  ],
  declarations: [SubPage]
})
export class SubPageModule {}
