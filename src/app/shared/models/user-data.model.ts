/* Enums */
import { LanguageEnum } from '../enums/language.enum';
import { PlanTypeEnum } from '../enums/plan-type.enum';
import { ThemeEnum } from '../enums/theme.enum';

export class UserData {
    language: LanguageEnum;
    theme: ThemeEnum;
    currency: string;
    showMoreInfo: boolean;
    totalPeriod: PlanTypeEnum;

    constructor(language: LanguageEnum, theme: ThemeEnum) {
        this.language = language;
        this.theme = theme;
        this.currency = 'EUR';
        this.showMoreInfo = true;
        this.totalPeriod = PlanTypeEnum.monthly;
    }
}
