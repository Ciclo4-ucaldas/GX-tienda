import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Caja, CajaRelations, Tienda, Empleado} from '../models';
import {TiendaRepository} from './tienda.repository';
import {EmpleadoRepository} from './empleado.repository';

export class CajaRepository extends DefaultCrudRepository<
  Caja,
  typeof Caja.prototype.id,
  CajaRelations
> {

  public readonly suTienda: BelongsToAccessor<Tienda, typeof Caja.prototype.id>;

  public readonly suEmpleado: HasOneRepositoryFactory<Empleado, typeof Caja.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TiendaRepository') protected tiendaRepositoryGetter: Getter<TiendaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Caja, dataSource);
    this.suEmpleado = this.createHasOneRepositoryFactoryFor('suEmpleado', empleadoRepositoryGetter);
    this.registerInclusionResolver('suEmpleado', this.suEmpleado.inclusionResolver);
    this.suTienda = this.createBelongsToAccessorFor('suTienda', tiendaRepositoryGetter,);
    this.registerInclusionResolver('suTienda', this.suTienda.inclusionResolver);
  }
}
