export class Vehiculo {
    marca!: string;
    modelo!: string;
    patente!: string;
    color!: string;
    capacidad: number=4; // Capacidad total de asientos
    asientosOcupados: number = 0; // Asientos ocupados inicialmente

    constructor(marca: string, modelo: string, patente: string, color: string, capacidad: number, asientosOcupados: number) {
        this.marca = marca;
        this.modelo = modelo;
        this.patente = patente;
        this.color = color;
        this.capacidad = capacidad;
        this.asientosOcupados=asientosOcupados;
    }

    // Método para ocupar un asiento
    ocuparAsiento() {
        if (this.asientosOcupados < this.capacidad) {
            this.asientosOcupados++;
        }
    }

    // Método para liberar un asiento
    liberarAsiento() {
        if (this.asientosOcupados > 0) {
            this.asientosOcupados--;
        }
    }
}
