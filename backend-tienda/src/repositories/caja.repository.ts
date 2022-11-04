import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Caja, CajaRelations} from '../models';

export class CajaRepository extends DefaultCrudRepository<
  Caja,
  typeof Caja.prototype.id,
  CajaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Caja, dataSource);
  }
}
