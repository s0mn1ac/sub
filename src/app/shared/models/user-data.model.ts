/* Models */
import { Sub } from './sub.model';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';
import { ThemeEnum } from '../enums/theme.enum';

export class UserData {
    language: LanguageEnum;
    theme: ThemeEnum;
    subs: Sub[];

    constructor(language: LanguageEnum, theme: ThemeEnum) {
        this.language = language;
        this.theme = theme;
        this.subs = [];
    }
}
