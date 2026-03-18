import { ActivatedRouteSnapshot, Routes } from '@angular/router';

const GET_TITLE = (route: ActivatedRouteSnapshot) => {
  const cat = route.paramMap.get('category');
  return cat ? `${cat} | new roots` : 'new roots';
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/main').then((c) => c.Main),
  },
  {
    path: ':category',
    title: GET_TITLE,
    loadComponent: () => import('./category/category').then((c) => c.Category),
  },
];
