/* Angular */
import { Injectable } from '@angular/core';

/* Others */
import { Observable, Subject } from 'rxjs';

/* Services */
import { StorageService } from './storage.service';

/* Enums */
import { ThemeEnum } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme$ = new Subject<ThemeEnum>();

  constructor(
    private storageService: StorageService
  ) { }

  public getDarkModeObservable(): Observable<ThemeEnum> {
    return this.theme$.asObservable();
  }

  public updateTheme(theme: ThemeEnum): void {
    this.storageService.theme = theme;
    this.theme$.next(theme);
  }

}
