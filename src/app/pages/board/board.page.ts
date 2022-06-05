/* Angular */
import { Component } from '@angular/core';

/* Models */
import { Sub } from 'src/app/shared/models/sub.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage {

  public subs: Sub[] = [];

  public isBoardEmpty: boolean;

  constructor(
    private storageService: StorageService
  ) { }

  ionViewWillEnter(): void {
    this.getAllSubs();
  }

  private getAllSubs(): void {
    this.subs = this.storageService.getAllSubs();
    this.isBoardEmpty = this.subs.length === 0;
  }

}
