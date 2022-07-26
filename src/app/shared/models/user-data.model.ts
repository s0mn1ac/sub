/* Models */
import { Sub } from './sub.model';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';
import { ThemeEnum } from '../enums/theme.enum';

export class UserData {
    language: LanguageEnum;
    theme: ThemeEnum;
    currency: string;
    showMoreInfo: boolean;
    subs: Sub[];

    constructor(language: LanguageEnum, theme: ThemeEnum) {
        this.language = language;
        this.theme = theme;
        this.currency = 'EUR';
        this.showMoreInfo = true;
        this.subs = [];
    }
}
