import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubPage } from './sub.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: SubPage,
  },
  {
    path: ':id',
    component: SubPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubPageRoutingModule {}
