/* Angular */
import { NgModule } from '@angular/core';

/* Others */
import { PlatformPageRoutingModule } from './platform-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

/* Pages */
import { PlatformPage } from './platform.page';

@NgModule({
  imports: [
    SharedModule,
    PlatformPageRoutingModule
  ],
  declarations: [PlatformPage]
})
export class PlatformPageModule {}
