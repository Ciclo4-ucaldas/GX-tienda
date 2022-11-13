import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Usuario } from '../models';
import { AdministradorRepository, EmpleadoRepository } from '../repositories';
import { Llaves } from '../config/Llaves';
const jwt=require("jsonwebtoken")
@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticacionService {
  constructor(
    @repository (AdministradorRepository)
    public repositorioAdministrador: AdministradorRepository,
    @repository (EmpleadoRepository)
    public repositorioEmpleado:EmpleadoRepository
    ) {}

  /*
   * Add service methods here
   */

  async generarToken(usuario:Usuario){
    let rol="";
    let admin= await this.repositorioAdministrador.findOne({where:{correo:usuario.correo,contrasena:usuario.contrasena}}) 
    if(admin){
      rol=admin.constructor.name
    }
    if(rol!=""){
      let Empl=await this.repositorioEmpleado.findOne({where:{correo:usuario.correo,contrasena:usuario.contrasena}}) ;
      if(Empl){
        rol=Empl.constructor.name
      }
    }
    let token=jwt.sign({
      data:{
        id:usuario.id,
        correo:usuario.correo,
        nombres:usuario.nombres,
        rol:rol
      }
    },Llaves.claveJWT
    )
    return token;
  }

  validarToken(token:string){
    try {
      let datos=jwt.verify(token,Llaves.claveJWT);
      return datos;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
