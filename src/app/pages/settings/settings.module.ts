// Angular modules
import { NgModule } from '@angular/core';

// Other modules
import { SettingsPageRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

// Pages
import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    SharedModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
