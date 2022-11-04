import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Tienda} from '../models';
import {TiendaRepository} from './tienda.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly suTiendaAcargo: HasOneRepositoryFactory<Tienda, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TiendaRepository') protected tiendaRepositoryGetter: Getter<TiendaRepository>,
  ) {
    super(Administrador, dataSource);
    this.suTiendaAcargo = this.createHasOneRepositoryFactoryFor('suTiendaAcargo', tiendaRepositoryGetter);
    this.registerInclusionResolver('suTiendaAcargo', this.suTiendaAcargo.inclusionResolver);
  }
}
