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
  Tienda,
  Caja,
} from '../models';
import {TiendaRepository} from '../repositories';

export class TiendaCajaController {
  constructor(
    @repository(TiendaRepository) protected tiendaRepository: TiendaRepository,
  ) { }

  @get('/tiendas/{id}/cajas', {
    responses: {
      '200': {
        description: 'Array of Tienda has many Caja',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Caja)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Caja>,
  ): Promise<Caja[]> {
    return this.tiendaRepository.susCajas(id).find(filter);
  }

  @post('/tiendas/{id}/cajas', {
    responses: {
      '200': {
        description: 'Tienda model instance',
        content: {'application/json': {schema: getModelSchemaRef(Caja)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Tienda.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caja, {
            title: 'NewCajaInTienda',
            exclude: ['id'],
            optional: ['tiendaId']
          }),
        },
      },
    }) caja: Omit<Caja, 'id'>,
  ): Promise<Caja> {
    return this.tiendaRepository.susCajas(id).create(caja);
  }

  @patch('/tiendas/{id}/cajas', {
    responses: {
      '200': {
        description: 'Tienda.Caja PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caja, {partial: true}),
        },
      },
    })
    caja: Partial<Caja>,
    @param.query.object('where', getWhereSchemaFor(Caja)) where?: Where<Caja>,
  ): Promise<Count> {
    return this.tiendaRepository.susCajas(id).patch(caja, where);
  }

  @del('/tiendas/{id}/cajas', {
    responses: {
      '200': {
        description: 'Tienda.Caja DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Caja)) where?: Where<Caja>,
  ): Promise<Count> {
    return this.tiendaRepository.susCajas(id).delete(where);
  }
}
