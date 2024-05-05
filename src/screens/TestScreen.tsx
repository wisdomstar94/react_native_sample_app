import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
// import dayjs from 'dayjs';
import RTNCalculator from 'rtn-calculator/js/NativeRtnCalculator';
import RTNDeviceinfo from 'rtn-deviceinfo/js/NativeRtnDeviceinfo';
import RTNLottieView from 'rtn-lottie-view/js/RtnLottieViewNativeComponent';
import { useCountStore } from '../stores/count.store';
import RTNMyLibrary from 'rtn_my_library/js/NativeRtnMyLibrary';

export function TestScreen() {
  const countStore = useCountStore((state) => state);
  const [sumNumber, setSumNumber] = useState(0);
  const [deviceModelName, setDeviceModelName] = useState('null');

  useEffect(() => {
    RTNCalculator?.add(10, 11).then((result) => {
      setSumNumber(result);
    });

    console.log('@RTNMyLibrary', RTNMyLibrary);
    RTNMyLibrary?.getDeviceModel().then((result) => {
      console.log('@@@RTNMyLibrary.getDeviceModel.result', result);
      setDeviceModelName(result);
    });
  }, []);

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
        <Text>Test Screen 입니다. { sumNumber }</Text>
        <Text>{ '(' + countStore.count + ')' }</Text>
        <RTNLottieView 
          style={{ 
            width: '50%', 
            height: 100, 
            backgroundColor: '#ff0', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            alignContent: 'center',
            alignSelf: 'center',
          }} text={deviceModelName + '...2'}
          />
        <Text>...</Text>
      </View>
    </>
  );
}
