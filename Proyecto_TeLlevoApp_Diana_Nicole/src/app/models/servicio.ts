import { User } from './user';
import { Vehiculo } from './vehiculo';

export class Service {
  id!: number;
  conductor!: User; // Referencia al usuario que ofrece el servicio
  vehiculo!: Vehiculo; // Referencia al vehículo utilizado en el servicio
  sede!: string;
  selectedValue!: number;
  distanciaMaxima!: number;
  pasajeros: User[] = []; // Lista de pasajeros
  minutosAnuncio!: number; // Añadir la propiedad minutosAnuncio

  constructor(
    id: number,
    conductor: User,
    vehiculo: Vehiculo,
    sede: string,
    selectedValue: number,
    distanciaMaxima: number,
    pasajeros: User[],
    minutosAnuncio: number // Añadir minutosAnuncio al constructor
  ) {
    this.id = id;
    this.conductor = conductor;
    this.vehiculo = vehiculo;
    this.sede = sede;
    this.selectedValue = selectedValue;
    this.distanciaMaxima = distanciaMaxima;
    this.pasajeros = pasajeros;
    this.minutosAnuncio = minutosAnuncio; // Inicializar minutosAnuncio
  }

  agregarPasajero(pasajero: User) {
    this.pasajeros.push(pasajero);
  }
}