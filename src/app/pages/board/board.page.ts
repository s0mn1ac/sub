/* Angular */
import { Component, OnInit } from '@angular/core';

/* Models */
import { Sub } from 'src/app/shared/models/sub.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {

  public subs: Sub[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getAllSubs();
  }

  private getAllSubs(): void {
    this.subs = [
      { id: 1, name: 'Amazon Prime Video', logo: 'logo-amazon', color: '#00A8E1' },
      { id: 1, name: 'Apple TV', logo: 'logo-apple', color: '#000000' },
      { id: 1, name: 'Xbox Game Pass', logo: 'logo-xbox', color: '#107C10' },
      { id: 1, name: 'YouTube Premium', logo: 'logo-youtube', color: '#FF0000' },
      { id: 1, name: 'PlayStation Plus', logo: 'logo-playstation', color: '#0072CE' },
      { id: 1, name: 'Amazon Prime Video', logo: 'logo-amazon', color: '#00A8E1' },
      { id: 1, name: 'Apple TV', logo: 'logo-apple', color: '#000000' },
      { id: 1, name: 'Xbox Game Pass', logo: 'logo-xbox', color: '#107C10' },
      { id: 1, name: 'YouTube Premium', logo: 'logo-youtube', color: '#FF0000' },
      { id: 1, name: 'PlayStation Plus', logo: 'logo-playstation', color: '#0072CE' },
      { id: 1, name: 'Amazon Prime Video', logo: 'logo-amazon', color: '#00A8E1' },
      { id: 1, name: 'Apple TV', logo: 'logo-apple', color: '#000000' },
      { id: 1, name: 'Xbox Game Pass', logo: 'logo-xbox', color: '#107C10' },
      { id: 1, name: 'YouTube Premium', logo: 'logo-youtube', color: '#FF0000' },
      { id: 1, name: 'PlayStation Plus', logo: 'logo-playstation', color: '#0072CE' }
    ];
  }

}
