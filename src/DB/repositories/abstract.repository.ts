import { DataSource, ObjectLiteral } from 'typeorm';

export interface FindAllOptions {
  where?: string; // "age > $1 AND status = $2"
  params?: any[]; // [18, 'active']
  orderBy?: string; // "created_at DESC"
  page?: number;
  limit?: number;
  select?: string; // "id, name, email"
}

export abstract class AbstractRepository<T extends ObjectLiteral> {
  protected abstract readonly tableName: string;

  constructor(protected readonly dataSource: DataSource) {}

  async findAll(options: FindAllOptions = {}) {
    const {
      where = '1=1',
      params = [],
      orderBy = 'id DESC',
      page = 1,
      limit = 10,
      select = '*',
    } = options;

    const offset = (page - 1) * limit;

    // كويري البيانات
    const dataQuery = `
      SELECT ${select}
      FROM ${this.tableName}
      WHERE ${where}
      ORDER BY ${orderBy}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    // كويري العدد الكلي (Pagination)
    const countQuery = `
      SELECT COUNT(*) as count FROM ${this.tableName} WHERE ${where}
    `;

    const [data, countResult] = await Promise.all([
      this.dataSource.query(dataQuery, [...params, limit, offset]),
      this.dataSource.query(countQuery, params),
    ]);

    const totalSize = parseInt(countResult[0].count);

    return {
      data: data as T[],
      totalSize,
      totalPages: Math.ceil(totalSize / limit),
      pageSize: limit,
      pageNumber: page,
    };
  }

  async findOne(where: string, params: any[] = []): Promise<T | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE ${where} LIMIT 1`;
    const result = await this.dataSource.query(query, params);
    return result[0] || null;
  }

  async create(data: Partial<T>): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const columns = keys.join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const query = `
      INSERT INTO ${this.tableName} (${columns})
      VALUES (${placeholders})
      RETURNING *
    `;

    const result = await this.dataSource.query(query, values);
    return result[0];
  }

  async update(
    where: string,
    whereParams: any[],
    data: Partial<T>,
  ): Promise<T | null> {
    const keys = Object.keys(data);
    const values = Object.values(data);

    // بناء الـ SET clause
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

    // ضبط ترتيب الـ placeholders للـ WHERE
    const whereClauseWithProperIndices = where.replace(/\$(\d+)/g, (_, n) => {
      return `$${parseInt(n) + keys.length}`;
    });

    const query = `
      UPDATE ${this.tableName}
      SET ${setClause}
      WHERE ${whereClauseWithProperIndices}
      RETURNING *
    `;

    const result = await this.dataSource.query(query, [
      ...values,
      ...whereParams,
    ]);
    return result[0] || null;
  }

  async delete(where: string, params: any[] = []): Promise<T | null> {
    const query = `DELETE FROM ${this.tableName} WHERE ${where} RETURNING *`;
    const result = await this.dataSource.query(query, params);
    return result[0] || null;
  }
}
