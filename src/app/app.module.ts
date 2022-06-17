/* Angular modules */
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

/* Ionic modules */
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

/* Other modules */
import { TranslocoRootModule } from './shared/modules/transloco-root.module';

/* App modules */
import { AppRoutingModule } from './app-routing.module';

/* Services */
import { TranslocoService } from '@ngneat/transloco';

/* Components */
import { AppComponent } from './app.component';

/* Constants */
import { databaseName } from './shared/constants/database.constants';

/* Locales */
import es from '@angular/common/locales/es';
import en from '@angular/common/locales/en';

registerLocaleData(es, 'es');
registerLocaleData(en, 'en');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({ name: databaseName }),
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: LOCALE_ID,
      useFactory: (translocoService: TranslocoService) => translocoService.getActiveLang(),
      deps: [TranslocoService]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
