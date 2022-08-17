/* Enums */
import { PlanTypeEnum } from '../enums/plan-type.enum';

export class Plan {
    id: number;
    name: string;
    price: number;
    isDefault: boolean;
    type: PlanTypeEnum;
}
