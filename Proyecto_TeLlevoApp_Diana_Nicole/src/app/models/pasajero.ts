export class Pasajero {
    usuario!: string;
    acepto: boolean = false; 
  
    constructor(usuario: string, acepto: boolean = false) {
      this.usuario = usuario;
      this.acepto = acepto;
    }
  }
  