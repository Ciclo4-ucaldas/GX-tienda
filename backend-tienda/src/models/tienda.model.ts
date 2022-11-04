import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Tienda>) {
    super(data);
  }
}

export interface TiendaRelations {
  // describe navigational properties here
}

export type TiendaWithRelations = Tienda & TiendaRelations;
