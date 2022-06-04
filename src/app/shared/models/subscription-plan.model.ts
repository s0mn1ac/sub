/* Enums */
import { SubscriptionTypeEnum } from '../enums/subscription-type.enum';

export class SubscriptionPlan {
    id: number;
    name: string;
    price: number;
    isDefault: boolean;
    type: SubscriptionTypeEnum;
}
