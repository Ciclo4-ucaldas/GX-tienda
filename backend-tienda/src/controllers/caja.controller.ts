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
import {Caja} from '../models';
import {CajaRepository} from '../repositories';

export class CajaController {
  constructor(
    @repository(CajaRepository)
    public cajaRepository : CajaRepository,
  ) {}

  @post('/cajas')
  @response(200, {
    description: 'Caja model instance',
    content: {'application/json': {schema: getModelSchemaRef(Caja)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caja, {
            title: 'NewCaja',
            exclude: ['id'],
          }),
        },
      },
    })
    caja: Omit<Caja, 'id'>,
  ): Promise<Caja> {
    return this.cajaRepository.create(caja);
  }

  @get('/cajas/count')
  @response(200, {
    description: 'Caja model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Caja) where?: Where<Caja>,
  ): Promise<Count> {
    return this.cajaRepository.count(where);
  }

  @get('/cajas')
  @response(200, {
    description: 'Array of Caja model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Caja, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Caja) filter?: Filter<Caja>,
  ): Promise<Caja[]> {
    return this.cajaRepository.find(filter);
  }

  @patch('/cajas')
  @response(200, {
    description: 'Caja PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caja, {partial: true}),
        },
      },
    })
    caja: Caja,
    @param.where(Caja) where?: Where<Caja>,
  ): Promise<Count> {
    return this.cajaRepository.updateAll(caja, where);
  }

  @get('/cajas/{id}')
  @response(200, {
    description: 'Caja model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Caja, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Caja, {exclude: 'where'}) filter?: FilterExcludingWhere<Caja>
  ): Promise<Caja> {
    return this.cajaRepository.findById(id, filter);
  }

  @patch('/cajas/{id}')
  @response(204, {
    description: 'Caja PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caja, {partial: true}),
        },
      },
    })
    caja: Caja,
  ): Promise<void> {
    await this.cajaRepository.updateById(id, caja);
  }

  @put('/cajas/{id}')
  @response(204, {
    description: 'Caja PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() caja: Caja,
  ): Promise<void> {
    await this.cajaRepository.replaceById(id, caja);
  }

  @del('/cajas/{id}')
  @response(204, {
    description: 'Caja DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cajaRepository.deleteById(id);
  }
}
