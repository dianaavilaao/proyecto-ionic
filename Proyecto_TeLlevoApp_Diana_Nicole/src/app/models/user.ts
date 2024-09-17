export class User {
    usuario!: string;
    contrasena!: string;


    constructor(usuario: string, contrasena: string){
        this.usuario = usuario;
        this.contrasena = contrasena;
    }
}
