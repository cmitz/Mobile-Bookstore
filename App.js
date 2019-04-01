import React from 'react';
import { SafeAreaView } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { setCustomText } from 'react-native-global-props';
import { Provider } from 'mobx-react';

import DashboardNavigator from './Components/Navigators/DashboardNavigator';
import StoresNavigator from './Components/Navigators/StoresNavigator';

import { RootStore } from './Stores/RootStore';

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

const store = RootStore.create();

export default class App extends React.Component {
  componentDidMount() {
    setCustomText({ style: { fontFamily: 'Roboto' } });
  }

  render() {
    return (
      <Provider rootStore={store} >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ececec' }}>
          <AppContainer />
        </SafeAreaView>
      </Provider>
    );
  }
}
