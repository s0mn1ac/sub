/* Angular */
import { Injectable } from '@angular/core';

/* Ionic */
import { Storage } from '@ionic/storage-angular';

/* Models */
import { UserData } from '../models/user-data.model';
import { Sub } from '../models/sub.model';

/* Constants */
import { subUserData } from '../constants/database.constants';

/* Enums */
import { ThemeEnum } from '../enums/theme.enum';
import { LanguageEnum } from '../enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage;

  private _userData: UserData;

  constructor(
    private storage: Storage
  ) { }

  // ---- USER DATA ------------------------------------------------------------------------------------------------------------------------

  get userData() {
    return this._userData;
  }

  set userData(userData: UserData) {
    this._userData = userData;
    this.storeUserData();
  }

  get language() {
    return this._userData.language;
  }

  set language(language: LanguageEnum) {
    this._userData.language = language;
    this.storeUserData();
  }

  get theme() {
    return this._userData.theme;
  }

  set theme(theme: ThemeEnum) {
    this._userData.theme = theme;
    this.storeUserData();
  }

  public async initStorage(): Promise<void> {
    this._storage = await this.storage.create();
  }

  public async storeUserData(): Promise<void> {
    this._storage.set(subUserData, this._userData);
  }

  public async retrieveUserData(): Promise<UserData> {
    return this._storage.get(subUserData);
  }

  // ---- SUBS -----------------------------------------------------------------------------------------------------------------------------

  public getAllSubs(): Sub[] {
    return this._userData.subs;
  }

  public getSubById(id: number): Sub {
    return this._userData.subs.find((sub: Sub) => sub.id === id);
  }

  public addNewSub(newSub: Sub): void {
    this._userData.subs.push(newSub);
    this.storeUserData();
  }

  public modifySub(id: number, sub: Sub): void {
    const foundSub: Sub = this._userData.subs.find((subToFind: Sub) => subToFind.id === id);
    if (foundSub !== null) {
      foundSub.name = sub.name;
      foundSub.description = sub.description;
      foundSub.logo = sub.logo;
      foundSub.color = sub.color;
      foundSub.platform = sub.platform;
      foundSub.plan = sub.plan;
      foundSub.type = sub.type;
      this.storeUserData();
    }
  }

  public deleteSub(id: number): void {
    const subs: Sub[] = this._userData.subs.filter((sub: Sub) => sub.id !== id);
    this._userData.subs = subs;
    this.storeUserData();
  }

}
