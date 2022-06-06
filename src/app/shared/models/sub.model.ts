/* Models */
import { PlatformPlan } from './platform-plan.model';
import { SubscriptionPlatform } from './subscription-platform.model';

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
    price: number;
    type: PlanTypeEnum;

    constructor(formValue: any = null) {
        this.id = new Date().getTime();
        if (formValue !== null) {
            this.name = formValue.name;
            this.description = formValue.description;
            this.logo = formValue.platform.logo;
            this.color = formValue.platform.color;
            this.platform = formValue.platform;
            this.plan = formValue.plan;
            this.price = formValue.price;
            this.type = formValue.type;
        }
    }
}
