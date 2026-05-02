import { IVendorEntity } from "../interfaces";
import { Nullable } from "../types";

export class VendorModel implements IVendorEntity {
  id: number = 0;
  name: string = "";
  contactNo: string = "";
  email: Nullable<string> = null;
  userId: number = 0;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  private constructor() {}

  static populateFromEntity(entity: IVendorEntity): VendorModel {
    return Object.assign(new VendorModel(), entity);
  }
}
