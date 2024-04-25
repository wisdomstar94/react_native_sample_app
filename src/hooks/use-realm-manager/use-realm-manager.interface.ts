export declare namespace IUseRealmManager {
  export interface Props {
    schema?: (Realm.RealmObjectConstructor<Realm.AnyRealmObject> | Realm.ObjectSchema)[];
    onChange?: (modelName: string, items: Realm.OrderedCollection<Realm.Object<any, never> & any, [number, Realm.Object<any, never> & any]>, changes: Realm.CollectionChangeSet) => void;
  }
}