import { Component, Input, OnInit } from '@angular/core';
import { Sub } from 'src/app/shared/models/sub.model';

@Component({
  selector: 'app-sub-card',
  templateUrl: './sub-card.component.html',
  styleUrls: ['./sub-card.component.scss'],
})
export class SubCardComponent implements OnInit {

  @Input() sub: Sub;

  constructor() { }

  ngOnInit(): void {
    //
  }

}
