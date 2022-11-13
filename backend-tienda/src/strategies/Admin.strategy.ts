import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { HttpErrors, RedirectRoute, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { AuthenticacionService } from "../services";

export class EstrategiaAdministrador implements AuthenticationStrategy{
    name:string="admin";
    constructor(
        @service(AuthenticacionService)
        public servicioAuthenticacion:AuthenticacionService
    ){}
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token= parseBearerToken(request);
        if(token){
         let datos= await this.servicioAuthenticacion.validarToken(token);
         if(datos){
            if(datos.data.rol=="Administrador"){
            let perfil:UserProfile=Object.assign(
                {
                    nombre:datos.data.nombres,
                    rol:datos.data.rol
                }
            )
            return perfil;
        }else{
            throw new HttpErrors[401]("El usuario no esta autorizado para esta accion")
        }
         }else{
            throw new HttpErrors[401]("token no valido")
         }
        }else{
            throw new HttpErrors[401]("No se envio un token en la solicitud")
        }
    }
    
}