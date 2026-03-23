import { Routes } from '@angular/router';

// Componentes de autenticación y carga
import { LoadingComponent } from './pages/loading/loading';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';

// Componentes de la aplicación (con Layout)
import { HomeComponent } from './pages/home/home';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { GroupComponent } from './pages/group/group'; // Asegúrate que el nombre coincida con el generado
import { UserComponent } from './pages/user/user';
import { ProfileComponent } from './pages/profile/profile';

export const routes: Routes = [
  // 1. Redirección inicial
  { path: '', redirectTo: 'loading', pathMatch: 'full' },

  // 2. Rutas públicas (Sin Sidebar)
  { path: 'loading', component: LoadingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
 
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'group', component: GroupComponent },
      { path: 'user', component: UserComponent },
      { path: 'profile', component: ProfileComponent },
      
      // Si el usuario entra a la raíz del layout, mandarlo a home
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // 4. Comodín (Catch-all) - Redirige a login si la ruta no existe
  { path: '**', redirectTo: 'login' }
];