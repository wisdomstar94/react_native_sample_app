import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screens } from '../../App';

export function useCustomNavigation() {
  const navigation = useNavigation<NativeStackNavigationProp<Screens>>();
  return navigation;
}