import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { FindAllOptions } from './types/findAllOptions';

export abstract class AbstractRepository<T extends ObjectLiteral> {
  protected abstract readonly entity: EntityTarget<T>;

  constructor(protected readonly dataSource: DataSource) {}

  protected get repository() {
    return this.dataSource.getRepository(this.entity);
  }

  async findAll(options: FindAllOptions = {}) {
    const {
      where = '1=1',
      params = {},
      orderBy = 'id',
      orderDirection = 'DESC',
      page = 1,
      limit = 10,
      select,
    } = options;

    const qb = this.repository.createQueryBuilder('e');

    // select
    if (select) {
      qb.select(select);
    }

    // where
    qb.where(where, params);

    // order
    qb.orderBy(`e.${orderBy}`, orderDirection);

    // pagination
    qb.skip((page - 1) * limit).take(limit);

    const [data, totalSize] = await qb.getManyAndCount();

    return {
      data,
      totalSize,
      totalPages: Math.ceil(totalSize / limit),
      pageSize: limit,
      pageNumber: page,
    };
  }

  async findOne(
    where: string,
    params: Record<string, any> = {},
  ): Promise<T | null> {
    return this.repository
      .createQueryBuilder('e')
      .where(where, params)
      .getOne();
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = this.repository.create(data as T);
    return await this.repository.save(entity);
  }

  async update(
    where: string,
    params: Record<string, any>,
    data: Partial<T>,
  ): Promise<T | null> {
    await this.repository
      .createQueryBuilder()
      .update(this.entity)
      .set(data)
      .where(where, params)
      .execute();

    return this.findOne(where, params);
  }

  async delete(
    where: string,
    params: Record<string, any> = {},
  ): Promise<T | null> {
    const entity = await this.findOne(where, params);

    if (!entity) return null;

    await this.repository
      .createQueryBuilder()
      .delete()
      .from(this.entity)
      .where(where, params)
      .execute();

    return entity;
  }
}
