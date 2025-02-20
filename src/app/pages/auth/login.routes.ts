import { Routes } from "@angular/router";

export const LOGIN_ROUTES: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login-page/login-page.component').then(m => m.LoginPageComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
]