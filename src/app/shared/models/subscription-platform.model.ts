/* Models */
import { PlatformPlan } from './platform-plan.model';

export class SubscriptionPlatform {
    id: number;
    name: string;
    logo: string;
    color: string;
    textColor: string;
    theme: string;
    plans: PlatformPlan[];
}
