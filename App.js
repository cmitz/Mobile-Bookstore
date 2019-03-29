import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './Components/Screens/HomeScreen';
import StoresScreen from './Components/Screens/StoresScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Stores: StoresScreen
}, {
  initialRouteName: 'Home'
});

export default createAppContainer(AppNavigator);
