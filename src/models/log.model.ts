import Realm, { ObjectSchema } from "realm";

export class Log extends Realm.Object<Log> {
  _id!: string;
  title!: string;
  content!: string;
  createdAt!: number;

  static schema: ObjectSchema = {
    name: "Log",
    properties: {
      _id: "string",
      title: "string",
      content: "string",
      createdAt: "int",
    },
    primaryKey: "_id",
  };
}