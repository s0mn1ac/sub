// Angular modules
import { NgModule } from '@angular/core';

// Other modules
import { BoardPageRoutingModule } from './board-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

// Pages
import { BoardPage } from './board.page';

@NgModule({
  imports: [
    SharedModule,
    BoardPageRoutingModule
  ],
  declarations: [BoardPage]
})
export class BoardPageModule {}
