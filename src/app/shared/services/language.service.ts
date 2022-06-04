/* Angular */
import { Injectable } from '@angular/core';

/* Others */
import { Observable, Subject } from 'rxjs';

/* Services */
import { StorageService } from './storage.service';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private language$ = new Subject<LanguageEnum>();

  constructor(
    private storageService: StorageService
  ) { }

  public getLanguageObservable(): Observable<LanguageEnum> {
    return this.language$.asObservable();
  }

  public updateLanguage(language: LanguageEnum): void {
    this.storageService.language = language;
    this.language$.next(language);
  }

}
