import React from 'react';
import { SafeAreaView } from 'react-native';
import { Font } from 'expo';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { setCustomText } from 'react-native-global-props';
import { Provider } from 'mobx-react';
import { Ionicons } from '@expo/vector-icons';

import DashboardNavigator from './Components/Navigators/DashboardNavigator';
import StoresNavigator from './Components/Navigators/StoresNavigator';
import Sidebar from './Components/Sidebar';

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
  contentComponent: props => <Sidebar {...props} />,
  navigationOptions: {
    drawerLabel: 'Navigation Drawer',
  },
});


const AppContainer = createAppContainer(AppNavigator);

const rootStore = RootStore.create();

export default class App extends React.Component {
  state = {
    loading: true
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setCustomText({ style: { fontFamily: 'Roboto' } });

    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <Provider rootStore={rootStore} >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ececec' }}>
          {loading ? <Expo.AppLoading />
            : <AppContainer />
          }
        </SafeAreaView>
      </Provider>
    );
  }
}
