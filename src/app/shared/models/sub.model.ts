/* Models */
import { SubscriptionPlatform } from './subscription-platform.model';
import { PlatformPlan } from './platform-plan.model';

/* Enums */
import { PlanTypeEnum } from '../enums/plan-type.enum';

export class Sub {
    id: number;
    name: string;
    description?: string;
    logo: string;
    color: string;
    platform: SubscriptionPlatform;
    plan: PlatformPlan;
    type: PlanTypeEnum;
    price: number;
    currency: string;

    constructor(formValue: any = null) {
        this.id = new Date().getTime();
        if (formValue !== null) {
            this.name = formValue.name;
            this.description = formValue.description;
            this.logo = formValue.platform.logo;
            this.color = formValue.platform.color;
            this.platform = formValue.platform;
            this.plan = formValue.plan;
            this.type = formValue.type;
            this.price = formValue.price;
            this.currency = formValue.currency;
        }
    }
}
