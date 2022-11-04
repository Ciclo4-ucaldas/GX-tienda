import {model, property, hasOne} from '@loopback/repository';
import {Usuario} from '.';
import {Tienda} from './tienda.model';

@model()
export class Administrador extends Usuario {
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
  cargo: string;

  @hasOne(() => Tienda)
  suTiendaAcargo: Tienda;

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
