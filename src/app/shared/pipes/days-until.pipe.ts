import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PlanTypeEnum } from '../enums/plan-type.enum';

@Pipe({
  name: 'daysUntil'
})
export class DaysUntilPipe implements PipeTransform {

  constructor(
    private translocoService: TranslocoService
  ) { }

  transform(value: string, period: PlanTypeEnum, asNumber: boolean = false): string | number {
    const firstPayment: Moment = moment(value, 'YYYY-MM-DD');
    const today: Moment = moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY');
    let nextPayment: Moment = this.getDefaultNextPaymentDate(firstPayment, today, period);
    let daysUntil: number = nextPayment.diff(today, 'days');
    while (daysUntil <= 0) {
      nextPayment = nextPayment.add(1, this.getUnitOfTymeByPeriod(period));
      daysUntil = nextPayment.diff(today, 'days');
    }
    return asNumber
      ? daysUntil
      : this.translocoService.translate(daysUntil === 1 ? 'sub.dayUntil' : 'sub.daysUntil', { days: daysUntil});
  }

  private getDefaultNextPaymentDate(firstPayment: Moment, today: Moment, period: PlanTypeEnum): Moment {
    let whileCounter: number = 5;
    let firstPaymentDay: string = firstPayment.format('DD');
    const firstPaymentMonth: string = firstPayment.format('MM');
    const todayMonth: string = today.format('MM');
    const todayYear: string = today.format('YYYY');
    let nextPayment: Moment;
    switch (period) {
      case PlanTypeEnum.daily:
        nextPayment = today.clone().add(1, 'day');
        break;
      case PlanTypeEnum.weekly:
        nextPayment = moment(`${firstPaymentDay}/${todayMonth}/${todayYear}`, 'DD/MM/YYYY');
        while (!nextPayment.isValid() || whileCounter === 0) {
          firstPaymentDay = (parseInt(firstPaymentDay, 10) - 1).toString();
          nextPayment = moment(`${firstPaymentDay}/${todayMonth}/${todayYear}`, 'DD/MM/YYYY');
          whileCounter = whileCounter - 1;
        }
        break;
      case PlanTypeEnum.monthly:
        nextPayment = moment(`${firstPaymentDay}/${todayMonth}/${todayYear}`, 'DD/MM/YYYY');
        while (!nextPayment.isValid() || whileCounter === 0) {
          firstPaymentDay = (parseInt(firstPaymentDay, 10) - 1).toString();
          nextPayment = moment(`${firstPaymentDay}/${todayMonth}/${todayYear}`, 'DD/MM/YYYY');
          whileCounter = whileCounter - 1;
        }
        break;
      case PlanTypeEnum.yearly:
        nextPayment = moment(`${firstPaymentDay}/${firstPaymentMonth}/${todayYear}`, 'DD/MM/YYYY');
        while (!nextPayment.isValid() || whileCounter === 0) {
          firstPaymentDay = (parseInt(firstPaymentDay, 10) - 1).toString();
          nextPayment = moment(`${firstPaymentDay}/${firstPaymentMonth}/${todayYear}`, 'DD/MM/YYYY');
          whileCounter = whileCounter - 1;
        }
        break;
    }    
    return nextPayment;
  }

  private getUnitOfTymeByPeriod(period: PlanTypeEnum): moment.unitOfTime.DurationConstructor {
    switch (period) {
      case PlanTypeEnum.daily:
        return 'day';
      case PlanTypeEnum.weekly:
        return 'week';
      case PlanTypeEnum.monthly:
        return 'month';
      case PlanTypeEnum.yearly:
        return 'year';
    }
  }

}
