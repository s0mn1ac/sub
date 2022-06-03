/* Angular modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

/* Ionic modules */
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

/* App modules */
import { AppRoutingModule } from './app-routing.module';

/* Other modules */
import { TranslocoRootModule } from './shared/modules/transloco-root.module';

/* Components */
import { AppComponent } from './app.component';

/* Constants */
import { databaseName } from './shared/constants/database.constants';

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
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
