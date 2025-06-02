import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { List } from './pages/list/list';

export const routes: Routes = [
    { path: 'dashboard', component: Dashboard },
    { path: 'list', component: List },
    { path: '**', redirectTo: 'dashboard' }
];
