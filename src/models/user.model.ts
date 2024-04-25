import Realm, { ObjectSchema } from "realm";

export class User extends Realm.Object<User> {
  _id!: string;
  name!: string;
  status?: string;

  static schema: ObjectSchema = {
    name: "User",
    properties: {
      _id: "string",
      name: "string",
      status: "string?",
    },
    primaryKey: "_id",
  };
}