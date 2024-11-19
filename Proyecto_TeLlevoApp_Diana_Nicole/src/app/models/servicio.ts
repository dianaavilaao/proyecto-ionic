import { Vehiculo } from './vehiculo';
import { User } from './user';
import { Pasajero } from './pasajero';

export class Service {
  id!: number;
  conductor!: User;
  vehiculo!: Vehiculo;
  sede!: string;
  minutosAnuncio!: number;
  distanciaMaxima!: number;

  // Propiedades calculadas
  tiempoRestante?: number;
  capacidadDisponible?: number;

  pasajeros: Pasajero[] = []; // Ahora es un array de objetos `Pasajero`
  enCurso: boolean = false;

  // Nuevo campo
  todosAceptaron?: boolean;

  constructor(
    id: number,
    conductor: User,
    vehiculo: Vehiculo,
    sede: string,
    minutosAnuncio: number,
    distanciaMaxima: number
  ) {
    this.id = id;
    this.conductor = conductor;
    this.vehiculo = vehiculo;
    this.sede = sede;
    this.minutosAnuncio = minutosAnuncio;
    this.distanciaMaxima = distanciaMaxima;
  }
}