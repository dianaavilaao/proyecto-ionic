// service.model.ts
import { Vehiculo } from './vehiculo';
import { User } from './user';

export class Service {
  id!: number;
  conductor!: User; // Referencia al usuario que ofrece el servicio
  vehiculo!: Vehiculo; // Referencia al vehículo utilizado en el servicio
  sede!: string; // Sede seleccionada para el servicio
  minutosAnuncio!: number; // Minutos que durará el anuncio
  distanciaMaxima!: number; // Distancia máxima en kilómetros

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
