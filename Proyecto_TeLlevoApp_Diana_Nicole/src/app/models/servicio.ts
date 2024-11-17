import { Vehiculo } from './vehiculo';
import { User } from './user';

export class Service {
  id!: number;
  conductor!: User;
  vehiculo!: Vehiculo;
  sede!: string;
  minutosAnuncio!: number;
  distanciaMaxima!: number;

  // Propiedades calculadas
  tiempoRestante?: number; // Tiempo restante en minutos
  capacidadDisponible?: number; // Capacidad disponible en el vehículo

  //ESTO DE ACA ES EXPERIMENTAL, HAY QUE VER SI SE VA A QUEDAR ASÍ O NO!!!
  pasajeros: { usuario: string; listo: boolean }[] = []; // Asegurar que siempre es un array
  enCurso: boolean = false; // Indica si el viaje está en curso

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
