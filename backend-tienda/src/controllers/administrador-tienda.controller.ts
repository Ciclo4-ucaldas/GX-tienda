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
  Administrador,
  Tienda,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorTiendaController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/tienda', {
    responses: {
      '200': {
        description: 'Administrador has one Tienda',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tienda),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tienda>,
  ): Promise<Tienda> {
    return this.administradorRepository.suTiendaAcargo(id).get(filter);
  }

  @post('/administradors/{id}/tienda', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tienda)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tienda, {
            title: 'NewTiendaInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) tienda: Omit<Tienda, 'id'>,
  ): Promise<Tienda> {
    return this.administradorRepository.suTiendaAcargo(id).create(tienda);
  }

  @patch('/administradors/{id}/tienda', {
    responses: {
      '200': {
        description: 'Administrador.Tienda PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tienda, {partial: true}),
        },
      },
    })
    tienda: Partial<Tienda>,
    @param.query.object('where', getWhereSchemaFor(Tienda)) where?: Where<Tienda>,
  ): Promise<Count> {
    return this.administradorRepository.suTiendaAcargo(id).patch(tienda, where);
  }

  @del('/administradors/{id}/tienda', {
    responses: {
      '200': {
        description: 'Administrador.Tienda DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tienda)) where?: Where<Tienda>,
  ): Promise<Count> {
    return this.administradorRepository.suTiendaAcargo(id).delete(where);
  }
}
