import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Tienda,
  Administrador,
} from '../models';
import {TiendaRepository} from '../repositories';

export class TiendaAdministradorController {
  constructor(
    @repository(TiendaRepository)
    public tiendaRepository: TiendaRepository,
  ) { }

  @get('/tiendas/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Tienda',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Tienda.prototype.id,
  ): Promise<Administrador> {
    return this.tiendaRepository.suAdministrador(id);
  }
}
