import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { setCustomText } from 'react-native-global-props';

import DashboardNavigator from './Components/Navigators/DashboardNavigator';
import StoresNavigator from './Components/Navigators/StoresNavigator';

const AppNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardNavigator
  },
  Stores: {
    screen: StoresNavigator
  },
}, {
  initialRouteName: 'Dashboard',
  navigationOptions: {
    drawerLabel: 'Navigation Drawer',
  },
});


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentDidMount() {
    setCustomText({ style: { fontFamily: 'Roboto' } });
  }

  render() {
    return <AppContainer />;
  }
}
