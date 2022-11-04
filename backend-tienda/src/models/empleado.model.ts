import {model, property} from '@loopback/repository';
import {Usuario} from '.';

@model()
export class Empleado extends Usuario {
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
  arl: string;

  @property({
    type: 'string',
    required: true,
  })
  eps: string;


  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
