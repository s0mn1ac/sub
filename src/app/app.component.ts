/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* Capacitor */
import { Device, GetLanguageCodeResult } from '@capacitor/device';
import { StatusBar, Style } from '@capacitor/status-bar';

/* Others */
import { Subscription } from 'rxjs';

/* Ionic */
import { isPlatform } from '@ionic/angular';

/* Services */
import { TranslocoService } from '@ngneat/transloco';
import { StorageService } from './shared/services/storage.service';
import { LanguageService } from './shared/services/language.service';
import { ThemeService } from './shared/services/theme.service';

/* Models */
import { UserData } from './shared/models/user-data.model';

/* Enums */
import { ThemeEnum } from './shared/enums/theme.enum';
import { LanguageEnum } from './shared/enums/language.enum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public isLoading: boolean = true;

  private theme$: Subscription;
  private language$: Subscription;

  constructor(
    private translocoService: TranslocoService,
    private storageService: StorageService,
    private languageService: LanguageService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.initSubscriptions();
    this.initApp();
  }

  ngOnDestroy(): void {
    this.cancelSubscriptions();
  }

  private initSubscriptions(): void {
    this.theme$ = this.themeService.getDarkModeObservable().subscribe((theme: ThemeEnum) => this.setTheme(theme));
    this.language$ = this.languageService.getLanguageObservable().subscribe((language: LanguageEnum) => this.setLanguage(language));
  }

  private cancelSubscriptions(): void {
    this.theme$?.unsubscribe();
    this.language$?.unsubscribe();
  }

  private async initApp(): Promise<void> {
    this.setLoading(true);
    await this.storageService.initStorage();
    let userData: UserData = await this.storageService.retrieveUserData();
    if (userData === null) {
      const theme: ThemeEnum = window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeEnum.dark : ThemeEnum.light;
      const language: GetLanguageCodeResult = await Device.getLanguageCode();
      userData = new UserData(language.value.startsWith('es') ? LanguageEnum.es : LanguageEnum.en, theme);
    }
    userData.theme = ThemeEnum.light; // TODO: Borrar
    this.storageService.userData = userData;
    this.themeService.updateTheme(userData.theme);
    this.languageService.updateLanguage(userData.language);
    this.setLoading(false);
  }

  private async setTheme(theme: ThemeEnum): Promise<void> {
    console.log(theme === ThemeEnum.dark ? '💡 Lights OFF!' : '💡 Lights ON!');
    document.body.classList.toggle('dark', theme === ThemeEnum.dark);
    if (isPlatform('mobile')) {
      await StatusBar.setBackgroundColor({ color: '#D1495B' });
      await StatusBar.setStyle({ style: theme ? Style.Dark : Style.Light });
    }
  }

  private async setLanguage(language: LanguageEnum): Promise<void> {
    console.log(language === LanguageEnum.es ? '🇪🇸 App language set to spanish' : '🇬🇧 App language set to english');
    this.translocoService.setActiveLang(language);
  }

  private setLoading(value: boolean): void {
    this.isLoading = value;
  }

}
