import { IAuditColumnEntity } from "../helpers/audit-column.entity.interface";
import { EntityList, EntityType } from "../utils/entity.utils";
import { OrderByDirection } from "../utils/sql-utils";

export type IEntityCreateDto<T> = Omit<T, "id" | keyof IAuditColumnEntity>;

export type IEntityUpdateDto<T> = Omit<
  Partial<T>,
  "id" | keyof IAuditColumnEntity
>;

export type IEntityFilterSearchData<K extends EntityList = EntityList> = {
  name: K;
  include?: IEntityFilterData<EntityType<K>>;
  relations?: IEntityFilterSearchData<EntityList>[];
  columnKeys?: (keyof EntityType<K>)[];
  orderBy?: Partial<Record<keyof EntityType<K>, OrderByDirection>>;
  limit?: number;
};

export type IEntityFilterData<T> = {
  [K in keyof T]?: T[K][];
} & {
  include?: IEntityFilterData<EntityType<EntityList>>;
  columnKeys?: (keyof T)[];
  entities?: IEntityFilterSearchData<EntityList>[];
  relations?: IEntityFilterSearchData<EntityList>[];
  orderBy?: Partial<Record<keyof T, OrderByDirection>>;
  limit?: number;
};

export interface IEntityFilterSearchDataV2<K extends EntityList = EntityList> {
  /**
   * Root entity being queried
   */
  name: K;

  /**
   * Query configuration + filters
   */
  filter?: IEntityFilterData<EntityType<K>>;
}

export type ISearchV2Response = {
  [key in EntityList]?: EntityType<key>[];
};
