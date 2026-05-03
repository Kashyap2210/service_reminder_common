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
  include: IEntityFilterData<EntityType<K>>;
  columnKeys?: (keyof EntityType<K>)[];
  orderBy?: Partial<Record<keyof EntityType<K>, OrderByDirection>>;
  limit?: number;
};

export type IEntityFilterData<T> = {
  [K in keyof T]?: T[K][];
} & {
  columnKeys?: (keyof T)[];
  entities?: IEntityFilterSearchData<EntityList>[];
  relations?: IEntityFilterSearchData<EntityList>[];
  orderBy?: Partial<Record<keyof T, OrderByDirection>>;
  limit?: number;
};

export type ISearchV2Response = {
  [key in EntityList]?: EntityType<key>[];
};
