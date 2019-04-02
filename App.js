import React from 'react';
import { SafeAreaView, AsyncStorage } from 'react-native';
import { Font, AppLoading } from 'expo';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { setCustomText } from 'react-native-global-props';
import { Provider } from 'mobx-react';
import { onSnapshot } from 'mobx-state-tree';
import { Ionicons } from '@expo/vector-icons';

import DashboardNavigator from './Components/Navigators/DashboardNavigator';
import StoresNavigator from './Components/Navigators/StoresNavigator';
import Sidebar from './Components/Sidebar';

import RootStore from './Stores/RootStore';

import { defineLocationBackgroundTask } from './Tasks';

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
defineLocationBackgroundTask();

export default class App extends React.Component {
  state = {
    loading: true,
    rootStore: null
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setCustomText({ style: { fontFamily: 'Roboto' } });

    const rootStore = await this.loadMobxStateTree();

    this.setState({ loading: false, rootStore });
  }

  async loadMobxStateTree() {
    let initialState = {};

    const potential = await AsyncStorage.getItem('bookStoreApp');
    if (potential) {
      const json = JSON.parse(potential);

      if (RootStore.is(json)) {
        initialState = json;
      }
    }
    const rootStore = RootStore.create(initialState);

    onSnapshot(rootStore, (snapshot) => {
      try {
        AsyncStorage.setItem('bookStoreApp', JSON.stringify(snapshot));
      } catch (error) {
        console.error(error);
      }
    });

    return rootStore;
  }

  render() {
    const { loading, rootStore } = this.state;
    return loading ? <AppLoading /> : (
      <Provider rootStore={rootStore} >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ececec' }}>
          <AppContainer />
        </SafeAreaView>
      </Provider>
    );
  }
}
