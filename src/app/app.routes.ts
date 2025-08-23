import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/main-page',
    pathMatch: 'full',
  },
  { path: 'update', loadComponent: () => import('./folder/update-page/update-page.page').then(m => m.UpdatePagePage) },
  // {
  //   path: 'folder/:id',
  //   loadComponent: () =>
  //     import('./folder/folder.page').then((m) => m.FolderPage),
  // },
  {
    path: 'folder/main-page',
    loadComponent: () => import('./folder/main-page/main-page.page').then( m => m.MainPagePage)
  },
  {
    path: 'folder/listing-page',
    loadComponent: () => import('./folder/listing-page/listing-page.page').then( m => m.ListingPagePage)
  },
  {
    path: 'folder/update-page',
    loadComponent: () => import('./folder/update-page/update-page.page').then( m => m.UpdatePagePage)
  }
];
