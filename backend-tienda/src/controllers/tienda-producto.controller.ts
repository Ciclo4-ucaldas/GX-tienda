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
  Producto,
} from '../models';
import {TiendaRepository} from '../repositories';

export class TiendaProductoController {
  constructor(
    @repository(TiendaRepository) protected tiendaRepository: TiendaRepository,
  ) { }

  @get('/tiendas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Tienda has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.tiendaRepository.Inventario(id).find(filter);
  }

  @post('/tiendas/{id}/productos', {
    responses: {
      '200': {
        description: 'Tienda model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Tienda.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInTienda',
            exclude: ['id'],
            optional: ['tiendaId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.tiendaRepository.Inventario(id).create(producto);
  }

  @patch('/tiendas/{id}/productos', {
    responses: {
      '200': {
        description: 'Tienda.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.tiendaRepository.Inventario(id).patch(producto, where);
  }

  @del('/tiendas/{id}/productos', {
    responses: {
      '200': {
        description: 'Tienda.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.tiendaRepository.Inventario(id).delete(where);
  }
}
