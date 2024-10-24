import { Vehiculo } from "./vehiculo";

export class Servicio {
    minutosDelAnuncio!: number;
    sede!: string;
    distanciaKM!: number;
    vehiculoSeleccionado!: Vehiculo;

    constructor(minutosDelAnuncio: number, sede: string, distanciaKM: number, vehiculoSeleccionado: Vehiculo) {
        this.minutosDelAnuncio = minutosDelAnuncio;
        this.sede = sede;
        this.distanciaKM = distanciaKM;
        this.vehiculoSeleccionado = vehiculoSeleccionado;
    }
}
