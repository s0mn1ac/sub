/* Angular */
import { Injectable } from '@angular/core';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
  ) { }

  public setLanguage(language: LanguageEnum): void {
    
  }

}
