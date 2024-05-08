import { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import library from 'rtn_my_library';

export function TestNativeImageScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [uri, setUri] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      library?.getDeviceModel().then((result) => {
        console.log('library?.getDeviceModel() result', `<${result}>`);
      });
      
      library?.requestGalleryImage().then((result) => {
        console.log('@result', result);

        const uri = result.trim();
        if (uri === '') {
          console.log('@uri 못가져옴...');
          return;
        }
        if (uri === 'permission-deny') {
          console.log('권한 거부됨!');
          return;
        }
        console.log('@uri', uri);
        setUri(uri);

        console.log('fetch...');
        fetch(`file://${uri}`).then(res => {
          return res.blob();
        }).then((blob) => {
          console.log('@blob', blob);
          const name: string = (blob as any)._data.name;
          const type: string = (blob as any)._data.type;
          const lastModified: number = (blob as any)._data.lastModified;
          console.log('@name', name);
          const file = new File([blob], name, { type, lastModified });
          console.log('@file', file);
        }).catch((error) => {
          console.error('error', error);
        });
      }).catch((error) => {
        console.error(`library?.requestGalleryImage().error`, error);
      }); 
    }, 3000);
      
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
              source={{
                uri: typeof uri === 'string' ? `file://${uri}` : undefined,
              }}
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
