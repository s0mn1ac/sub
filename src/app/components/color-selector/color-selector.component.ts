/* Angular */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonModal } from '@ionic/angular';

/* Constants */
import { COLORS } from 'src/app/shared/constants/colors.constants';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss'],
})
export class ColorSelectorComponent {

  @Input() modal: IonModal;
  @Input() selected: string;

  @Output() onSelectColor: EventEmitter<string> = new EventEmitter<string>();

  public colors: string[] = COLORS;

  public selectColor(color: string): void {
    this.onSelectColor.emit(color);
    this.closeModal();
  }

  public closeModal(): void {
    this.modal.dismiss();
  }

}
