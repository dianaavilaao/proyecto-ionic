import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService, 
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const usuarioAutenticado = await this.loginService.obtenerUsuarioAutenticado(); // Verificar usuario autenticado

    if (!usuarioAutenticado) {
      this.router.navigate(['/login']); // Redirigir a la página de login si no está autenticado
      return false;
    }

    return true; // Permitir acceso si está autenticado
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

