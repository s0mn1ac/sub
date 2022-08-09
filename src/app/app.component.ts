/* Angular */
import { Component, OnInit } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { initUserData } from './state/actions/user-data.actions';
import { initSubsData } from './state/actions/subs-data.actions';

/* Capacitor */
import { Device, GetLanguageCodeResult } from '@capacitor/device';

/* Services */
import { StorageService } from './shared/services/storage.service';

/* Models */
import { UserData } from './shared/models/user-data.model';
import { SubsData } from './shared/models/subs-data.model';

/* Enums */
import { ThemeEnum } from './shared/enums/theme.enum';
import { LanguageEnum } from './shared/enums/language.enum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.initApp();
  }

  private async initApp(): Promise<void> {
    await this.storageService.initStorage();
    const subsData: SubsData = await this.storageService.getSubsData() ?? await this.initSubsData();
    const userData: UserData = await this.storageService.getUserData() ?? await this.initUserData();
    this.storageService.setLanguage(userData.language);
    this.storageService.setTheme(userData.theme);
    this.store.dispatch(initSubsData({ subsData }));
    this.store.dispatch(initUserData({ userData }));
  }

  private async initSubsData(): Promise<SubsData> {
    const subsData: SubsData = new SubsData();
    return this.storageService.setSubsData(subsData);
  }

  private async initUserData(): Promise<UserData> {
    const theme: ThemeEnum = window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeEnum.dark : ThemeEnum.light;
    const language: GetLanguageCodeResult = await Device.getLanguageCode();
    const userData: UserData = new UserData(language.value.startsWith('es') ? LanguageEnum.es : LanguageEnum.en, theme);
    return await this.storageService.setUserData(userData);
  }

}
