import { useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

export function TestTextInputScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setValue('바뀜~~~~~');
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
              height: 50,
              marginTop: 10,
              paddingHorizontal: 10, 
            }}>
            <TextInput
              style={{ 
                width: '100%', 
                height: '100%',
                borderColor: '#000',
                borderWidth: 1,
                padding: 10,
              }}
              value={value}
              onChangeText={(text) => {
                setValue(text);
              }}
              />
          </View>
          
        </ScrollView>
      </View>
    </>
  );
}
