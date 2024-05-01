import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './screens/SplashScreen';
import { TestScreen } from './screens/TestScreen';
import { TestRealmScreen } from './screens/TestRealmScreen';

const Stack = createNativeStackNavigator();

export type Screens = {
  Splash: undefined,
  Test: undefined,
  TestRealm: undefined,
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="TestRealm" component={TestRealmScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
