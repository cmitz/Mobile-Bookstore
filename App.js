import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './Components/HomeScreen';
import StoresScreen from './Components/StoresScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Stores: StoresScreen
}, {
  initialRouteName: "Home"
});

export default createAppContainer(AppNavigator);
