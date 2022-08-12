/* Models */
import { PlatformPlan } from './platform-plan.model';

export class SubscriptionPlatform {
    id: number;
    name: string;
    logo: string;
    textColor: string;
    theme: string;
    plans: PlatformPlan[];

    constructor(formValue: any = null) {

        if (formValue !== null) {
            this.id = formValue.id;
            this.name = formValue.name;
            this.logo = formValue.logo;
            this.textColor = formValue.textColor;
            this.theme = formValue.color;
            this.plans = formValue.plans.map((plan: any) => ({
                id: plan.id,
                name: plan.name,
                price: plan.price,
                isDefault: plan.isDefault,
                type: plan.type,
            }));
        }
    }
}
