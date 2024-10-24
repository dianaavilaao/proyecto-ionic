import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private storage: Storage) { }

  // Inicializa el storage
  async initStorage() {
    await this.storage.create();
  }

  // Valida el login verificando si el usuario y contraseña son correctos
  async validarLogin(usuario: string, contrasena: string): Promise<boolean> {
    // Cargar usuarios desde storage
    const storedUsers = await this.storage.get('users');
    const users = storedUsers || [];

    // Buscar el usuario
    const found = users.find((user: User) => user.usuario === usuario || user.email === usuario);
    if (found) {
      return found.contrasena === contrasena;
    }
    return false;
  }


  async autenticarUsuario(usuario: string, contrasena: string): Promise<User | null> {
    // Cargar usuarios desde el almacenamiento
    const storedUsers = await this.storage.get('users');
    const users = storedUsers || [];

    // Buscar el usuario que coincida con el nombre de usuario o email
    const found = users.find((u: User) => (u.usuario === usuario || u.email === usuario) && u.contrasena === contrasena);
    
    return found || null;
  }


  // Guarda usuarios en storage (cuando agregas o modificas usuarios)
  async guardarUsuario(user: User): Promise<void> {
    const storedUsers = await this.storage.get('users');
    const users = storedUsers || [];

    // Verifica si el usuario ya existe
    const index = users.findIndex((u: User) => u.usuario === user.usuario);
    if (index > -1) {
      users[index] = user; // Actualiza el usuario si ya existe
    } else {
      users.push(user); // Agrega un nuevo usuario
    }

    // Guardar la lista actualizada en storage
    await this.storage.set('users', users);
  }

  // Busca un usuario en storage
  async buscarUsuario(usuario: string): Promise<User | undefined> {
    const storedUsers = await this.storage.get('users');
    console.log('Usuarios almacenados:', storedUsers);  // <-- Verifica qué usuarios están almacenados
    const users = storedUsers || [];
  
    return users.find((user: User) => user.usuario.toLowerCase() === usuario.toLowerCase());
  }
  

  // Actualiza la contraseña de un usuario específico
  async actualizarContrasena(usuario: string, nuevaContrasena: string): Promise<boolean> {
    const storedUsers = await this.storage.get('users');
    const users = storedUsers || [];

    const found = users.find((user: User) => user.usuario === usuario);
    if (found) {
      found.contrasena = nuevaContrasena;
      await this.storage.set('users', users); // Guardar los cambios en storage
      return true;
    }
    return false;
  }

  async registrarUsuario(nuevoUsuario: User): Promise<string | void> {
    const storedUsers = await this.storage.get('users') || [];
    const users = storedUsers as User[];
  
    // Verifica si el nombre de usuario, email o teléfono ya existen
    const usuarioExistente = users.find(u => u.usuario === nuevoUsuario.usuario);
    const emailExistente = users.find(u => u.email === nuevoUsuario.email);
    const telefonoExistente = users.find(u => u.telefono === nuevoUsuario.telefono);
  
    if (usuarioExistente) {
      return 'El nombre de usuario ya está registrado.';
    }
  
    if (emailExistente) {
      return 'El email ya está registrado.';
    }
  
    if (telefonoExistente) {
      return 'El teléfono ya está registrado.';
    }
  
    // Si no existen conflictos, agrega el nuevo usuario a la lista
    users.push(nuevoUsuario);
  
    // Guarda la lista actualizada en el almacenamiento
    await this.storage.set('users', users);
  }

  async obtenerUsuarioAutenticado(): Promise<User | null> {
    const usuarioAutenticado = await this.storage.get('usuarioAutenticado');
    return usuarioAutenticado || null;
  }

  async actualizarUsuarioAutenticado(usuarioActualizado: User): Promise<void> {
    await this.storage.set('usuarioAutenticado', usuarioActualizado);
  }






  ///////////////////////
  // Nueva función para obtener el vehículo del usuario actual
  async obtenerVehiculoUsuario(usuario: string): Promise<Vehiculo | null> {
    const user = await this.buscarUsuario(usuario);
    if (user && user.vehiculos && user.vehiculos.length > 0) {
      return user.vehiculos[0]; // Retorna el primer vehículo
    }
    return null;
  }

  // Nueva función para agregar o actualizar vehículo
  async guardarVehiculo(usuario: string, vehiculo: Vehiculo): Promise<void> {
    const storedUsers = await this.storage.get('users');
    const users = storedUsers || [];
    
    const userIndex = users.findIndex((u: User) => u.usuario === usuario);
    if (userIndex > -1) {
      users[userIndex].vehiculos = [vehiculo]; // Reemplaza el vehículo existente
      await this.storage.set('users', users);
      
      // Actualizar también el usuario autenticado
      const usuarioAutenticado = await this.obtenerUsuarioAutenticado();
      if (usuarioAutenticado && usuarioAutenticado.usuario === usuario) {
        usuarioAutenticado.vehiculos = [vehiculo];
        await this.actualizarUsuarioAutenticado(usuarioAutenticado);
      }
    }
  }

  // Nueva función para eliminar vehículo
  async eliminarVehiculo(usuario: string): Promise<void> {
    const storedUsers = await this.storage.get('users');
    const users = storedUsers || [];
    
    const userIndex = users.findIndex((u: User) => u.usuario === usuario);
    if (userIndex > -1) {
      users[userIndex].vehiculos = [];
      await this.storage.set('users', users);
      
      // Actualizar usuario autenticado
      const usuarioAutenticado = await this.obtenerUsuarioAutenticado();
      if (usuarioAutenticado && usuarioAutenticado.usuario === usuario) {
        usuarioAutenticado.vehiculos = [];
        await this.actualizarUsuarioAutenticado(usuarioAutenticado);
      }
    }
  }

}
