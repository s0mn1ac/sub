import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatformPage } from './platform.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: PlatformPage,
  },
  {
    path: ':id',
    component: PlatformPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformPageRoutingModule {}
