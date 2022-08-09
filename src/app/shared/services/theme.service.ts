/* Angular */
import { Injectable } from '@angular/core';
import { isPlatform } from '@ionic/angular';

/* Capacitor */
import { StatusBar, Style } from '@capacitor/status-bar';

/* Enums */
import { ThemeEnum } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public setTheme(theme: ThemeEnum): void {
    console.log(theme === ThemeEnum.dark ? '💡 Lights OFF!' : '💡 Lights ON!');
    document.body.classList.toggle('dark', theme === ThemeEnum.dark);
    if (isPlatform('mobile')) {
      StatusBar.setBackgroundColor({ color: '#D1495B' });
      StatusBar.setStyle({ style: theme ? Style.Dark : Style.Light });
    }
  }

}
