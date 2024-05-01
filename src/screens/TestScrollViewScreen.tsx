import { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';

export function TestScrollViewScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const secondtViewRef = useRef<View>(null);

  useEffect(() => {
    setTimeout(() => {
      secondtViewRef.current?.measure((x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: true });
      });
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
          <View style={{ width: '100%', height: 100, display: 'flex', backgroundColor: '#f00' }}></View>
          <View ref={secondtViewRef} style={{ width: '100%', height: 200, display: 'flex', backgroundColor: '#3cac58' }}></View>
          <View style={{ width: '100%', height: 300, display: 'flex', backgroundColor: '#2b6fdc' }}></View>
          <View style={{ width: '100%', height: 400, display: 'flex', backgroundColor: '#e474d0' }}></View>
          <View style={{ width: '100%', height: 500, display: 'flex', backgroundColor: '#4b3c3c' }}></View>
        </ScrollView>
      </View>
    </>
  );
}
