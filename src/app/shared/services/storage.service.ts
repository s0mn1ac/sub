/* Angular */
import { Injectable } from '@angular/core';

/* Ionic */
import { Storage } from '@ionic/storage-angular';

/* Models */
import { UserData } from '../models/user-data.model';

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

  // ---- STORAGE --------------------------------------------------------------------------------------------------------------------------

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
    await this._storage.set(subUserData, this._userData);
  }

  public async retrieveUserData(): Promise<UserData> {
    return await this._storage.get(subUserData);
  }

}
