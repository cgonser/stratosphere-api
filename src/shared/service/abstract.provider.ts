import { EntityNotFoundError, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

export abstract class AbstractProvider<Entity> {
  protected constructor(private repository: Repository<Entity>) {}

  findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Entity> {
    const options = this.prepareFindOneOptions({ id: id });

    return this.repository.findOne(options);
  }

  findOneBy(criteria: any): Promise<Entity> {
    const options = this.prepareFindOneOptions(criteria);

    return this.repository.findOne(options);
  }

  async get(id: string): Promise<Entity> {
    const entityObject = await this.findOne(id);

    if (!entityObject) {
      throw new EntityNotFoundError(this.repository.target, id);
    }

    return entityObject;
  }

  async getBy(criteria: any): Promise<Entity> {
    const entityObject = await this.findOneBy(criteria);

    if (!entityObject) {
      throw new EntityNotFoundError(this.repository.target, criteria);
    }

    return entityObject;
  }

  prepareFindOneOptions(criteria: any): FindOneOptions {
    return { where: criteria };
  }
}
