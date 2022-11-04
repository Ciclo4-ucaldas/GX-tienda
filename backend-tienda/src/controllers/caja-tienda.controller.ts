import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Caja,
  Tienda,
} from '../models';
import {CajaRepository} from '../repositories';

export class CajaTiendaController {
  constructor(
    @repository(CajaRepository)
    public cajaRepository: CajaRepository,
  ) { }

  @get('/cajas/{id}/tienda', {
    responses: {
      '200': {
        description: 'Tienda belonging to Caja',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tienda)},
          },
        },
      },
    },
  })
  async getTienda(
    @param.path.string('id') id: typeof Caja.prototype.id,
  ): Promise<Tienda> {
    return this.cajaRepository.suTienda(id);
  }
}
