import { useEffect, useRef, useState } from "react";
import { IUseRealmManager } from "./use-realm-manager.interface";
import Realm from 'realm';

export function useRealmManager(props: IUseRealmManager.Props) {
  const { onChange, schema } = props;
  const [isInit, setIsInit] = useState(false);
  const [privateRealm, setPrivateRealm] = useState<Realm>();
  const isDestroyed = useRef(false);

  function write(callback: (realm: Realm) => void) {
    if (privateRealm === undefined) {
      console.error(`realm 인스턴스가 초기화되지 않았습니다.`);
      return;
    }

    privateRealm.write(() => {
      callback(privateRealm);
    });
  }

  function findForPrimaryKey<T>(modelName: string, _id: string): T | undefined {
    if (privateRealm === undefined) {
      console.error(`realm 인스턴스가 초기화되지 않았습니다.`);
      return;
    }

    const item = privateRealm.objectForPrimaryKey(modelName, _id);
    if (item === null) return;
    return item as T;
  }

  function findAll<T>(modelName: string): T[] | undefined {
    if (privateRealm === undefined) {
      console.error(`realm 인스턴스가 초기화되지 않았습니다.`);
      return;
    }

    const items = privateRealm.objects(modelName) as any;
    return items as T[];
  }

  function deleteAll(modelName: string): boolean {
    if (privateRealm === undefined) {
      console.error(`realm 인스턴스가 초기화되지 않았습니다.`);
      return false;
    }
    
    privateRealm.write(() => {
      privateRealm.delete(privateRealm.objects(modelName));  
    });

    return true;
  }

  useEffect(() => {
    isDestroyed.current = false;

    Realm.open({
      schema,
    }).then(res => {
      if (isDestroyed.current) {
        res.close();
        return;
      }
      setPrivateRealm(res);
    });

    return () => {
      isDestroyed.current = true;
      privateRealm?.close();
      setPrivateRealm(undefined);
    };
  }, []);

  useEffect(() => {
    if (privateRealm === undefined) return;

    for (const Item of (schema ?? [])) {
      const modelName = Item.name;
      const model = privateRealm.objects(modelName);
      model.addListener((items, changes) => {
        if (typeof onChange === 'function') {
          onChange(modelName, items, changes);  
        }
      });
    }

    // privateRealm.addListener('change', (realm, eventName) => {
    //   console.log(`@change.realm`, realm.);
    // });
    setIsInit(true);

    return () => {
      privateRealm.removeAllListeners('change');
      setIsInit(false);
    };
  }, [privateRealm]);

  return {
    // realm,
    isInit,
    write,
    findForPrimaryKey,
    findAll,
    deleteAll,
  };
}