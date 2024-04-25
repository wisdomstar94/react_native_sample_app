import { Text, View } from 'react-native';
import { useRealmManager } from '../hooks/use-realm-manager/use-realm-manager.hook';
import { User } from '../models/user.model';
import { Log } from '../models/log.model';
import { useEffect } from 'react';
import uuid from 'react-native-uuid';
import { UpdateMode } from 'realm';
// import dayjs from 'dayjs';

export function TestScreen() {
  const realmManager = useRealmManager({
    schema: [User, Log],
    onChange(modelName, items, changes) {
      // console.log(`############## useRealmManager.onChange Start ##############`);
      // console.log('@modelName', modelName);
      // console.log('@items', items);
      // console.log('@changes', changes);
      // changes.deletions.forEach((index) => {
      //   // You cannot directly access deleted objects,
      //   // but you can update a UI list, etc. based on the index.
      //   console.log(`Looks like Dog #${index} has left the realm.`);
      // });
      // // Handle newly added Dog objects
      // changes.insertions.forEach((index) => {
      //   const insertedDog = items[index];
      //   console.log(`Welcome our new friend, ${JSON.stringify(insertedDog)}!`);
      // });
      // // Handle Dog objects that were modified
      // changes.newModifications.forEach((index) => {
      //   const modifiedDog = items[index];
      //   console.log(`Hey ${JSON.stringify(modifiedDog)}, you look different!`);
      // });
    },
  });

  useEffect(() => {
    if (!realmManager.isInit) return;

    // write
    realmManager.write((realm) => {
      realm.create<User>(User, {
        _id: uuid.v4().toString(),
        name: '홍길동',
        status: 'active',
      });
      realm.create<Log>(Log, {
        _id: uuid.v4().toString(),
        title: '로그 1 제목',
        content: '로그 1 내용',
        createdAt: Date.now(),
      });
    });

    // find all
    const findAllItems = realmManager.findAll<Log>("Log");
    console.log('@findAllItems', findAllItems);

    // modify
    realmManager.write((realm) => {
      const findItem = realmManager.findForPrimaryKey<Log>("Log", "d45ee2ba-a77c-4436-af4f-6dac95f72c61");
      console.log('');
      console.log('@@modify.findItem', findItem);
      console.log('');

      if (findItem !== undefined) {
        realm.create<Log>(Log, {
          _id: "d45ee2ba-a77c-4436-af4f-6dac95f72c61",
          title: '로그 1 제목 (수정)',
          content: '로그 1 내용 (수정)',
          createdAt: findItem.createdAt,
        }, UpdateMode.Modified);
      }
    });

    // find for primary key
    const findItem = realmManager.findForPrimaryKey<Log>("Log", "d45ee2ba-a77c-4436-af4f-6dac95f72c61");
    console.log('@findItem', findItem);

    // delete all
    realmManager.deleteAll('User');

    // delete
    realmManager.write((realm) => {
      // const logs = realm.objects<Log>('Log');
      const logs = realm.objects<Log>('Log').filter(x => x.createdAt <= 1714038398975);
      console.log('@delete.logs', logs);
      realm.delete(logs);
    });
  }, [realmManager.isInit]);

  return (
    <>
      <View
        style={{
          width: '100%',
          height: '100%',
          // flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // flexDirection: 'column',
          backgroundColor: '#ffffff',
        }}>
        <Text>Test Screen 입니다.</Text>
      </View>
    </>
  );
}
