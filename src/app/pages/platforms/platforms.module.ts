/* Angular */
import { NgModule } from '@angular/core';

/* Others */
import { PlatformsPageRoutingModule } from './platforms-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

/* Pages */
import { PlatformsPage } from './platforms.page';

@NgModule({
  imports: [
    SharedModule,
    PlatformsPageRoutingModule
  ],
  declarations: [PlatformsPage]
})
export class PlatformsPageModule {}
