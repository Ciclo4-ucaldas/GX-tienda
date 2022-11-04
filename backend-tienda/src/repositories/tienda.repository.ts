import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Tienda, TiendaRelations} from '../models';

export class TiendaRepository extends DefaultCrudRepository<
  Tienda,
  typeof Tienda.prototype.id,
  TiendaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Tienda, dataSource);
  }
}
