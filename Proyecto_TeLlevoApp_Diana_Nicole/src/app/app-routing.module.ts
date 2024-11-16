import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginService } from '../app/services/login.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'offer-services',
    loadChildren: () => import('./offer-services/offer-services.module').then( m => m.OfferServicesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'search-services',
    loadChildren: () => import('./search-services/search-services.module').then( m => m.SearchServicesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'selected-service',
    loadChildren: () => import('./selected-service/selected-service.module').then( m => m.SelectedServicePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'service-status',
    loadChildren: () => import('./service-status/service-status.module').then( m => m.ServiceStatusPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'protected',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)
  },
  { 
    path: '**', 
    redirectTo: 'not-found' 
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }