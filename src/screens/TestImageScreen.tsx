import { useEffect, useRef, useState } from 'react';
import { Image, ImageSourcePropType, ScrollView, TextInput, View } from 'react-native';

export function TestImageScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [src, setSrc] = useState<ImageSourcePropType>();

  useEffect(() => {
    setTimeout(() => {
      setSrc(require('../assets/jellyfish.jpg'));
    }, 1000);  
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
        <ScrollView ref={scrollViewRef} style={{ width: '100%', height: '100%' }}>
          <View
            style={{
              width: '100%',
              height: 500,
              marginTop: 10,
              paddingHorizontal: 10, 
            }}>
            <Image
              source={src}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode={'cover'}
              fadeDuration={0}
              />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
