import { Routes } from '@angular/router';
import { GuestGuard } from './api/helpers/guards/guest.guard';
import { AuthGuard } from './api/helpers/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/login.routes').then(m => m.LOGIN_ROUTES),
        canActivate: [GuestGuard]
    },
    {
       path: 'admin',
       loadChildren: () => import('./pages/admin/admin.routes').then(m => m.DASHBOARD_ROUTES),
       canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' }
];
