import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './screens/SplashScreen';
import { TestScreen } from './screens/TestScreen';
import { TestRealmScreen } from './screens/TestRealmScreen';
import { TestScrollViewScreen } from './screens/TestScrollViewScreen';
import { TestTextInputScreen } from './screens/TestTextInputScreen';
import { TestImageScreen } from './screens/TestImageScreen';

const Stack = createNativeStackNavigator();

export type Screens = {
  SplashScreen: undefined,
  TestScreen: undefined,
  TestRealmScreen: undefined,
  TestScrollViewScreen: undefined,
  TestTextInputScreen: undefined,
  TestImageScreen: undefined,
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="TestRealmScreen" component={TestRealmScreen} />
        <Stack.Screen name="TestScrollViewScreen" component={TestScrollViewScreen} />
        <Stack.Screen name="TestTextInputScreen" component={TestTextInputScreen} />
        <Stack.Screen name="TestImageScreen" component={TestImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
