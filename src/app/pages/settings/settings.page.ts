/* Angular */
import { Component, OnInit } from '@angular/core';

/* RxJs */
import { Observable } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCurrency, selectLanguage, selectShowMoreInfo, selectTheme } from 'src/app/state/selectors/user-data.selectors';
import { setCurrency, setLanguage, setShowMoreInfo, setTheme } from 'src/app/state/actions/user-data.actions';

/* Others */
import { CurrencyCodeRecord } from 'currency-codes';
import { orderBy } from 'lodash';
import * as cc from 'currency-codes';

/* Services */
import { StorageService } from 'src/app/shared/services/storage.service';

/* Enums */
import { LanguageEnum } from 'src/app/shared/enums/language.enum';
import { ThemeEnum } from 'src/app/shared/enums/theme.enum';

/* Constants */
import { LANGUAGES } from 'src/app/shared/constants/languages.constants';
import { THEMES } from 'src/app/shared/constants/themes.constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public language$: Observable<string> = new Observable<string>();
  public showMoreInfo$: Observable<boolean> = new Observable<boolean>();
  public theme$: Observable<string> = new Observable<string>();
  public currency$: Observable<string> = new Observable<string>();

  public languageOptions: LanguageEnum[] = LANGUAGES;
  public themeOptions: ThemeEnum[] = THEMES;

  public currencies: CurrencyCodeRecord[] = [];

  constructor(
    private store: Store<AppState>,
    private storageService: StorageService
  ) {
    this.currencies = orderBy(cc.data, 'currency');
  }

  ngOnInit(): void {
    this.initStoreSelectors();
  }

  public onChangeLanguage(language: LanguageEnum): void {
    this.store.dispatch(setLanguage({ language }));
    this.storageService.setLanguage(language);
  }
  
  public onChangeShowMoreInfo(showMoreInfo: boolean): void {
    this.store.dispatch(setShowMoreInfo({ showMoreInfo }));
    this.storageService.setShowMoreInfo(showMoreInfo);
  }

  public onChangeTheme(theme: ThemeEnum): void {
    this.store.dispatch(setTheme({ theme }));
    this.storageService.setTheme(theme);
  }

  public onChangeCurrency(event: any): void {
    const currency: string = event.detail.value;
    this.store.dispatch(setCurrency({ currency }))
    this.storageService.setCurrency(currency);
  }

  private initStoreSelectors(): void {
    this.language$ = this.store.select(selectLanguage);
    this.showMoreInfo$ = this.store.select(selectShowMoreInfo);
    this.theme$ = this.store.select(selectTheme);
    this.currency$ = this.store.select(selectCurrency);
  }

}
