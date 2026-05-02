import { ISearchV2Response } from "../types/generic.dto.types";
import { entityListEntityModelMap } from "../utils";
import {
  EntityList,
  EntityListEntityModelMap,
  EntityModelType,
  EntityType,
} from "../utils/entity.utils";

/**
 * Helper class for extracting typed entities from a `searchV2` response.
 *
 * @example new EntityFilterDataHelper(searchV2Response)
 *
 * @methods
 * - `getEntityFromList(name)` — returns typed entity array for the given `EntityList` key. e.g. `helper.getEntityFromList(EntityList.USER) // IUserEntity[]`
 */
export class EntityFilterDataHelper {
  constructor(private readonly searchResponse: ISearchV2Response) {}

  getEntityFromList<T extends EntityList>(name: T): EntityType<T>[] {
    return this.searchResponse[name] ?? [];
  }

  // getEntityModelsMap(): EntityListEntityModelMap {
  getEntityModelsMap(): EntityListEntityModelMap {
    const responseObj: EntityListEntityModelMap =
      {} as EntityListEntityModelMap;

    for (const key of Object.keys(this.searchResponse) as EntityList[]) {
      const populateFn = entityListEntityModelMap[key];
      if (!populateFn) continue;

      // @ts-expect-error - conditional type EntityModelType<T> cannot be resolved in loop context
      (responseObj[key] as EntityModelType<typeof key>[]) = this.searchResponse[
        key
      ].map((entity) =>
        (populateFn as (e: typeof entity) => EntityModelType<typeof key>)(
          entity,
        ),
      );
    }

    return responseObj;
  }
}
