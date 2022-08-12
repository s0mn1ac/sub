/* Angular */
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.state';
import { UserDataEffects } from './state/effects/user-data.effects';
import { SubsDataEffects } from './state/effects/subs-data.effects';

/* Ionic */
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

/* Others */
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
    TranslocoRootModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'app-sub-devtools' }),
    EffectsModule.forRoot([
      SubsDataEffects,
      UserDataEffects
    ])
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
