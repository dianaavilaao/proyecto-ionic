import { Vehiculo } from "./vehiculo";

export class User {
    usuario!: string;
    email!: string;
    telefono!: string;
    contrasena!: string;
    sede!: string;
    vehiculos: Vehiculo[] = []; // Un usuario puede tener uno o más vehículos

    constructor(usuario: string, email: string, telefono: string, contrasena: string, sede: string) {
        this.usuario = usuario;
        this.email = email;
        this.telefono = telefono;
        this.contrasena = contrasena;
        this.sede = sede;
    }

    agregarVehiculo(vehiculo: Vehiculo) {
        this.vehiculos.push(vehiculo);
    }
}
