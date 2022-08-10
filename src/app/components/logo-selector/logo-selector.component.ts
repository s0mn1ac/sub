/* Angular */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonModal } from '@ionic/angular';

/* Models */
import { Icon } from 'src/app/shared/models/icon.model';

/* Constants */
import { ICONS } from 'src/app/shared/constants/icons.constants';

@Component({
  selector: 'app-logo-selector',
  templateUrl: './logo-selector.component.html',
  styleUrls: ['./logo-selector.component.scss'],
})
export class LogoSelectorComponent {

  @Input() modal: IonModal;
  @Input() selected: string;
  @Input() theme: string;

  @Output() onSelectIcon: EventEmitter<string> = new EventEmitter<string>();

  public icons: Icon[] = ICONS;

  public selectIcon(icon: string): void {
    this.onSelectIcon.emit(icon);
    this.closeModal();
  }

  public closeModal(): void {
    this.modal.dismiss();
  }

}
