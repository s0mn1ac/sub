/* Angular */
import { Component } from '@angular/core';

/* Models */
import { Sub } from 'src/app/shared/models/sub.model';
import { UserData } from 'src/app/shared/models/user-data.model';
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

  private getAllSubs(): void {
    this.setLoading(true);
    this.storageService.retrieveUserData()
      .then((userData: UserData) => {
        if (userData !== null && userData !== undefined) {
          this.subs = userData.subs;
          this.isBoardEmpty = this.subs.length === 0;
        }
      })
      .finally(() => this.setLoading(false));
  }

  private setLoading(value: boolean): void {
    this.isLoading = value;
  }

}
