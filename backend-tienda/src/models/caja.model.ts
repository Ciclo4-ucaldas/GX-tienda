import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Tienda} from './tienda.model';
import {Empleado} from './empleado.model';

@model()
export class Caja extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  TotalEfectivo: number;

  @belongsTo(() => Tienda, {name: 'suTienda'})
  tiendaId: string;

  @hasOne(() => Empleado)
  suEmpleado: Empleado;

  constructor(data?: Partial<Caja>) {
    super(data);
  }
}

export interface CajaRelations {
  // describe navigational properties here
}

export type CajaWithRelations = Caja & CajaRelations;
