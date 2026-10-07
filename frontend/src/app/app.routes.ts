import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';
export const routes:Routes=[
 {path:'',pathMatch:'full',redirectTo:'dashboard'},
 {path:'login',loadComponent:()=>import('./features/auth/login.component').then(m=>m.LoginComponent)},
 {path:'dashboard',canActivate:[authGuard],loadComponent:()=>import('./features/dashboard/dashboard.component').then(m=>m.DashboardComponent)},
 {path:'admin/users',canActivate:[authGuard,adminGuard],loadComponent:()=>import('./features/admin/users.component').then(m=>m.UsersComponent)},
 {path:'**',redirectTo:'dashboard'}
];
