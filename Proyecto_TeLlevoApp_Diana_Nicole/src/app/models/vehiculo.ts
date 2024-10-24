export class Vehiculo {
    marca!: string;
    modelo!: string;
    patente!: string;
    color!: string;

    constructor(marca: string, modelo: string, patente: string, color: string) {
        this.marca = marca;
        this.modelo = modelo;
        this.patente = patente;
        this.color = color;
    }
}
