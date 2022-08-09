/* Angular */
import { Injectable } from '@angular/core';

/* Capacitor */
import { StatusBar, Style } from '@capacitor/status-bar';

/* Ionic */
import { Storage } from '@ionic/storage-angular';
import { isPlatform } from '@ionic/angular';

/* Services */
import { TranslocoService } from '@ngneat/transloco';

/* Models */
import { UserData } from '../models/user-data.model';
import { SubsData } from '../models/subs-data.model';
import { Sub } from '../models/sub.model';

/* Constants */
import { subAppSubsData, subAppUserData } from '../constants/database.constants';

/* Enums */
import { ThemeEnum } from '../enums/theme.enum';
import { LanguageEnum } from '../enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage;

  constructor(
    private storage: Storage,
    private translocoService: TranslocoService
  ) { }


  // ---- STORAGE --------------------------------------------------------------------------------------------------------------------------

  public async initStorage(): Promise<void> {
    this._storage = await this.storage.create();
  }


  // ---- USER DATA ------------------------------------------------------------------------------------------------------------------------

  public getUserData(): Promise<UserData> {
    return this._storage.get(subAppUserData);
  }

  public setUserData(userData: UserData): Promise<UserData> {
    return this._storage.set(subAppUserData, userData);
  }

  public async setCurrency(currency: string): Promise<void> {
    const userData: UserData = await this._storage.get(subAppUserData);
    userData.currency = currency;
    await this._storage.set(subAppUserData, userData);
  }

  public async setTheme(theme: ThemeEnum): Promise<void> {
    console.log(theme === ThemeEnum.dark ? '💡 Lights OFF!' : '💡 Lights ON!');
    document.body.classList.toggle('dark', theme === ThemeEnum.dark);
    if (isPlatform('mobile')) {
      StatusBar.setBackgroundColor({ color: '#D1495B' });
      StatusBar.setStyle({ style: theme ? Style.Dark : Style.Light });
    }
    const userData: UserData = await this._storage.get(subAppUserData);
    userData.theme = theme;
    await this._storage.set(subAppUserData, userData);
  }

  public async setLanguage(language: LanguageEnum): Promise<void> {
    console.log(language === LanguageEnum.es ? '🇪🇸 App language set to spanish' : '🇬🇧 App language set to english');
    this.translocoService.setActiveLang(language);
    const userData: UserData = await this._storage.get(subAppUserData);
    userData.language = language;
    await this._storage.set(subAppUserData, userData);
  }


  // ---- SUBS DATA ------------------------------------------------------------------------------------------------------------------------

  public getSubsData(): Promise<SubsData> {
    return this._storage.get(subAppSubsData);
  }

  public setSubsData(subsData: SubsData): Promise<SubsData> {
    return this._storage.set(subAppSubsData, subsData);
  }

  public async addSub(sub: Sub): Promise<void> {
    const subsData: SubsData = await this._storage.get(subAppSubsData);
    subsData.subs.push(sub)
    await this._storage.set(subAppSubsData, subsData);
  }

  public async modifySub(id: number, sub: Sub): Promise<void> {
    const subsData: SubsData = await this._storage.get(subAppSubsData);
    const foundSub: Sub = subsData.subs.find((subToFind: Sub) => subToFind.id === id);
    if (foundSub === null || foundSub === undefined) {
      return;
    }
    foundSub.name = sub.name;
    foundSub.description = sub.description;
    foundSub.logo = sub.logo;
    foundSub.color = sub.color;
    foundSub.platform = sub.platform;
    foundSub.plan = sub.plan;
    foundSub.type = sub.type;
    foundSub.every = sub.every;
    foundSub.firstPayment = sub.firstPayment;
    foundSub.price = sub.price;
    foundSub.currency = sub.currency;
    await this._storage.set(subAppSubsData, subsData);
  }

  public async deleteSub(id: number): Promise<void> {
    const subsData: SubsData = await this._storage.get(subAppSubsData);
    subsData.subs = subsData.subs.filter((sub: Sub) => sub.id !== id);
    await this._storage.set(subAppSubsData, subsData);
  }

}
