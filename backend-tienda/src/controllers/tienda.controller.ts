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
} from '@loopback/rest';
import {Tienda} from '../models';
import {TiendaRepository} from '../repositories';

export class TiendaController {
  constructor(
    @repository(TiendaRepository)
    public tiendaRepository : TiendaRepository,
  ) {}

  @post('/tiendas')
  @response(200, {
    description: 'Tienda model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tienda)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tienda, {
            title: 'NewTienda',
            exclude: ['id'],
          }),
        },
      },
    })
    tienda: Omit<Tienda, 'id'>,
  ): Promise<Tienda> {
    return this.tiendaRepository.create(tienda);
  }

  @get('/tiendas/count')
  @response(200, {
    description: 'Tienda model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tienda) where?: Where<Tienda>,
  ): Promise<Count> {
    return this.tiendaRepository.count(where);
  }

  @get('/tiendas')
  @response(200, {
    description: 'Array of Tienda model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tienda, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tienda) filter?: Filter<Tienda>,
  ): Promise<Tienda[]> {
    return this.tiendaRepository.find(filter);
  }

  @patch('/tiendas')
  @response(200, {
    description: 'Tienda PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tienda, {partial: true}),
        },
      },
    })
    tienda: Tienda,
    @param.where(Tienda) where?: Where<Tienda>,
  ): Promise<Count> {
    return this.tiendaRepository.updateAll(tienda, where);
  }

  @get('/tiendas/{id}')
  @response(200, {
    description: 'Tienda model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tienda, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tienda, {exclude: 'where'}) filter?: FilterExcludingWhere<Tienda>
  ): Promise<Tienda> {
    return this.tiendaRepository.findById(id, filter);
  }

  @patch('/tiendas/{id}')
  @response(204, {
    description: 'Tienda PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tienda, {partial: true}),
        },
      },
    })
    tienda: Tienda,
  ): Promise<void> {
    await this.tiendaRepository.updateById(id, tienda);
  }

  @put('/tiendas/{id}')
  @response(204, {
    description: 'Tienda PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tienda: Tienda,
  ): Promise<void> {
    await this.tiendaRepository.replaceById(id, tienda);
  }

  @del('/tiendas/{id}')
  @response(204, {
    description: 'Tienda DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tiendaRepository.deleteById(id);
  }
}
