import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatformsPage } from './platforms.page';

const routes: Routes = [
  {
    path: '',
    component: PlatformsPage
  },
  {
    path: 'platform',
    loadChildren: () => import('./pages/platform/platform.module').then( m => m.PlatformPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformsPageRoutingModule {}
