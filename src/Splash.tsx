import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export function Splash() {
  const [inited, setIninted] = useState(false);

  function onAnimationFinish(isCancelled: boolean) {
    console.log('@onAnimationFinish', isCancelled);
  }

  async function init() {
    // ...
    await new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve(undefined);
      }, 3000);
    });
    setIninted(true);
  }

  useEffect(() => {
    try {
      init();
    } catch(e) {
      console.error(e);

    }
  }, []);

  useEffect(() => {
    console.log(`[${Date.now()}] @inited`, inited);
    if (inited) {
      
    }
  }, [inited]);

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
          backgroundColor: '#fff',
        }}>
        <LottieView
          style={{
            width: 200,
            height: 200,
            // backgroundColor: '#ff0',
          }}
          source={require('./assets/splash-lottie-icon.json')}
          autoPlay
          loop={false}
          onAnimationFinish={onAnimationFinish}
        />
      </View>
    </>
  );
}
