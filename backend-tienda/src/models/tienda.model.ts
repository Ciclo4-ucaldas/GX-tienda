import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Caja} from './caja.model';
import {Producto} from './producto.model';

@model()
export class Tienda extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  barrio: string;

  @property({
    type: 'string',
  })
  codigoPostal?: string;

  @belongsTo(() => Administrador, {name: 'suAdministrador'})
  administradorId: string;

  @hasMany(() => Caja)
  susCajas: Caja[];

  @hasMany(() => Producto)
  Inventario: Producto[];

  constructor(data?: Partial<Tienda>) {
    super(data);
  }
}

export interface TiendaRelations {
  // describe navigational properties here
}

export type TiendaWithRelations = Tienda & TiendaRelations;
