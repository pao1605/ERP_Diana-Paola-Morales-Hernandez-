import { Routes } from '@angular/router';

import { LoadingComponent } from './pages/loading/loading';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';

import { HomeComponent } from './pages/home/home';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
  
  { path: '', redirectTo: 'loading', pathMatch: 'full' },

  
  { path: 'loading', component: LoadingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent }
    ]
  },

 
  { path: '**', redirectTo: 'login' }
];