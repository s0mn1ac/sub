/* Models */
import { Platform } from './platform.model';
import { Plan } from './plan.model';

/* Enums */
import { PlanTypeEnum } from '../enums/plan-type.enum';

export class Sub {
    id: number;
    name: string;
    description?: string;
    logo: string;
    color: string;
    textColor: string;
    platform: Platform;
    plan: Plan;
    type: PlanTypeEnum;
    every: number;
    firstPayment: string;
    price: number;
    currency: string;

    constructor(formValue: any = null) {
        this.id = new Date().getTime();
        if (formValue !== null) {
            this.name = formValue.name;
            this.description = formValue.description;
            this.logo = formValue.logo;
            this.color = formValue.color;
            this.textColor = formValue.textColor;
            this.platform = formValue.platform;
            this.plan = formValue.plan;
            this.type = formValue.type;
            this.every = formValue.every;
            this.firstPayment = formValue.firstPayment;
            this.price = formValue.price;
            this.currency = formValue.currency;
        }
    }
}
