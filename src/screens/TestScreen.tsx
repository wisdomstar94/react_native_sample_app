import { Text, View } from 'react-native';

export function TestScreen() {
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
