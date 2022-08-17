/* Angular */
import { Component } from '@angular/core';

/* Others */
import { replace } from 'lodash';

/* Services */
import { ToastService } from 'src/app/shared/services/toast.service';

/* Models */
import { SubscriptionPlatform } from 'src/app/shared/models/subscription-platform.model';

/* Constants */
import { copiedToClipboard } from 'src/app/shared/constants/codes.constants';
import { PlatformsService } from 'src/app/shared/services/platforms.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrls: ['./platforms.page.scss'],
})
export class PlatformsPage {

  public platforms: SubscriptionPlatform[] = [];

  constructor(
    private platformsService: PlatformsService,
    private toastService: ToastService
  ) { }

  ionViewWillEnter(): void {
    this.platforms = this.platformsService.platforms;
  }

  public async generatePlatformsList(): Promise<void> {
    const platformsAsString: string = JSON.stringify(this.platforms);
    const replaceDoubleQuotes: string = replace(platformsAsString, /"/g, '\'');
    const replaceId: string = replace(replaceDoubleQuotes, /'id'/g, 'id');
    const replaceName: string = replace(replaceId, /'name'/g, 'name');
    const replaceLogo: string = replace(replaceName, /'logo'/g, 'logo');
    const replaceTextColor: string = replace(replaceLogo, /'textColor'/g, 'textColor');
    const replaceTheme: string = replace(replaceTextColor, /'theme'/g, 'theme');
    const replacePlans: string = replace(replaceTheme, /'plans'/g, 'plans');
    const replacePrice: string = replace(replacePlans, /'price'/g, 'price');
    const replaceIsDefault: string = replace(replacePrice, /'isDefault'/g, 'isDefault');
    const replaceType: string = replace(replaceIsDefault, /'type'/g, 'type');
    const replaceDayly: string = replace(replaceType, /type:'dayly'/g, 'type:PlanTypeEnum.dayly');
    const replaceWeekly: string = replace(replaceDayly, /type:'weekly'/g, 'type:PlanTypeEnum.weekly');
    const replaceMonthly: string = replace(replaceWeekly, /type:'monthly'/g, 'type:PlanTypeEnum.monthly');
    const replaceYearly: string = replace(replaceMonthly, /type:'yearly'/g, 'type:PlanTypeEnum.yearly');
    const platformsAsJSON: string = `export const SUBSCRIPTION_PLATFORMS: SubscriptionPlatform[] = ${replaceYearly};\n`;
    await navigator.clipboard.writeText(platformsAsJSON);
    this.toastService.throwSuccessToast(copiedToClipboard);
  }

}
