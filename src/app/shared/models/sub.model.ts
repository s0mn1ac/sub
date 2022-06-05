/* Enums */
import { PlanTypeEnum } from '../enums/plan-type.enum';

export class Sub {
    id: number;
    name: string;
    description?: string;
    logo: string;
    color: string;
    platformId: number;
    planId: number;
    price: number;
    type: PlanTypeEnum;

    constructor(formValue: any = null) {
        this.id = new Date().getTime();
        if (formValue !== null) {
            this.name = formValue.name;
            this.description = formValue.description;
            this.logo = formValue.platform.logo;
            this.color = formValue.platform.color;
            this.platformId = formValue.platform.id;
            this.planId = formValue.plan.id;
            this.price = formValue.price;
            this.type = formValue.type;
        }
    }
}
