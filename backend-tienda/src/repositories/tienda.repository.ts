import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Tienda, TiendaRelations, Administrador, Caja, Producto} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {CajaRepository} from './caja.repository';
import {ProductoRepository} from './producto.repository';

export class TiendaRepository extends DefaultCrudRepository<
  Tienda,
  typeof Tienda.prototype.id,
  TiendaRelations
> {

  public readonly suAdministrador: BelongsToAccessor<Administrador, typeof Tienda.prototype.id>;

  public readonly susCajas: HasManyRepositoryFactory<Caja, typeof Tienda.prototype.id>;

  public readonly Inventario: HasManyRepositoryFactory<Producto, typeof Tienda.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('CajaRepository') protected cajaRepositoryGetter: Getter<CajaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Tienda, dataSource);
    this.Inventario = this.createHasManyRepositoryFactoryFor('Inventario', productoRepositoryGetter,);
    this.registerInclusionResolver('Inventario', this.Inventario.inclusionResolver);
    this.susCajas = this.createHasManyRepositoryFactoryFor('susCajas', cajaRepositoryGetter,);
    this.registerInclusionResolver('susCajas', this.susCajas.inclusionResolver);
    this.suAdministrador = this.createBelongsToAccessorFor('suAdministrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('suAdministrador', this.suAdministrador.inclusionResolver);
  }
}
