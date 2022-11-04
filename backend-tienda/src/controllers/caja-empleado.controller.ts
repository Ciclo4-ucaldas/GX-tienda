import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Caja,
  Empleado,
} from '../models';
import {CajaRepository} from '../repositories';

export class CajaEmpleadoController {
  constructor(
    @repository(CajaRepository) protected cajaRepository: CajaRepository,
  ) { }

  @get('/cajas/{id}/empleado', {
    responses: {
      '200': {
        description: 'Caja has one Empleado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Empleado),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado> {
    return this.cajaRepository.suEmpleado(id).get(filter);
  }

  @post('/cajas/{id}/empleado', {
    responses: {
      '200': {
        description: 'Caja model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Caja.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInCaja',
            exclude: ['id'],
            optional: ['cajaId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.cajaRepository.suEmpleado(id).create(empleado);
  }

  @patch('/cajas/{id}/empleado', {
    responses: {
      '200': {
        description: 'Caja.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.cajaRepository.suEmpleado(id).patch(empleado, where);
  }

  @del('/cajas/{id}/empleado', {
    responses: {
      '200': {
        description: 'Caja.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.cajaRepository.suEmpleado(id).delete(where);
  }
}
