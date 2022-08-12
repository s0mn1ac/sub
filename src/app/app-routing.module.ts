/* Angular modules */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: 'board',
    loadChildren: () => import('./pages/board/board.module').then( m => m.BoardPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'sub',
    loadChildren: () => import('./pages/sub/sub.module').then( m => m.SubPageModule)
  },
  {
    path: 'platforms',
    loadChildren: () => import('./pages/platforms/platforms.module').then( m => m.PlatformsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
