export class Vehiculo {
    marca!: string;
    modelo!: string;
    patente!: string;
    color!: string;
    capacidadMaxima: number; // Capacidad total predeterminada de asientos
    asientosOcupados: number; // Asientos ocupados iniciales
  
    constructor(
      marca: string,
      modelo: string,
      patente: string,
      color: string,
      capacidadMaxima: number, // Valor por defecto si no se especifica
      asientosOcupados: number // Valor inicial de asientos ocupados
    ) {
      this.marca = marca;
      this.modelo = modelo;
      this.patente = patente;
      this.color = color;
      this.capacidadMaxima = capacidadMaxima;
      this.asientosOcupados = asientosOcupados;
    }
  
    ocuparAsiento() {
      if (this.asientosOcupados < this.capacidadMaxima) {
        this.asientosOcupados++;
      }
    }
  
    liberarAsiento() {
      if (this.asientosOcupados > 0) {
        this.asientosOcupados--;
      }
    }
}
