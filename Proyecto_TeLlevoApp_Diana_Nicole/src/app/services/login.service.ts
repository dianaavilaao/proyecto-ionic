import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [
    new User('adminNicole', '12345'),
    new User('adminDiana', '12345'),
  ];

  constructor() { }

  validarLogin(usuario: string, contrasena: string): boolean {
    const found = this.users.find(user => user.usuario === usuario);
    if (found !== undefined) {
      console.log("Usuario existe!");
      return found.contrasena === contrasena;
    }
    return false;
  }

  buscarUsuario(usuario: string): User | undefined {
    return this.users.find(user => user.usuario === usuario);
  }

  actualizarContrasena(usuario: string, nuevaContrasena: string): boolean {
    const found = this.buscarUsuario(usuario);
    if (found) {
      found.contrasena = nuevaContrasena;
      return true;
    }
    return false;
  }
}
