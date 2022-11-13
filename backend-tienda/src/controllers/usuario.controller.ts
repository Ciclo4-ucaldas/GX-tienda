import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Credencial, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import { AuthenticacionService } from '../services';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
    @service(AuthenticacionService)
    public servicioAuthenticacion:AuthenticacionService
  ) {}

  @post("/identificarUsuario",{
   responses:{
    '200':{
      description:"Identificacion de usuario"
    }
   }
  }
  )
  async identificarUsuario(@requestBody() credencial:Credencial){
    let usuario=await this.servicioAuthenticacion.identificarUsuario(credencial.usuario,credencial.clave)
    let token;
    if(usuario){
       token =await this.servicioAuthenticacion.generarToken(usuario,usuario.constructor.name);
      return{
        datos:{
          nombres:usuario.nombres,
          correo:usuario.correo,
          id:usuario.id,
          rol:usuario.constructor.name
        },
        tk:token
      }
    }else {
      throw new HttpErrors[401]("datos invalidos")
    }
  }
}
