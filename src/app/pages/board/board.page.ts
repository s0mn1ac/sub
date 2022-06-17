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

  public isLoading: boolean = true;
  public isBoardEmpty: boolean;

  constructor(
    private storageService: StorageService
  ) { }

  ionViewWillEnter(): void {
    this.getAllSubs();
  }

  private async getAllSubs(): Promise<void> {
    this.setLoading(true);
    await this.storageService.retrieveUserData();
    this.subs = this.storageService.getAllSubs();
    this.isBoardEmpty = this.subs.length === 0;
    this.setLoading(false);
  }

  private setLoading(value: boolean): void {
    this.isLoading = value;
  }

}
