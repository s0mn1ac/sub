/* Models */
import { SubscriptionPlan } from './subscription-plan.model';

export class SubscriptionOption {
    id: number;
    name: string;
    logo: string;
    color: string;
    plans: SubscriptionPlan[];
}
