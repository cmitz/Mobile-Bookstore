import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import defaultMenuIcon from '../../assets/icon.png';

import NavigationDrawerStructure from '../NavigationDrawerStructure';
import HomeScreen from '../Screens/Home/Index';

const DashboardNavigator = createStackNavigator({
  Home: HomeScreen,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => ({
    drawerLabel: 'Screen',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={defaultMenuIcon}
        style={[styles.icon, { tintColor }]}
      />
    ),
    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
    headerStyle: {
      backgroundColor: '#cecece',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }),
});

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default DashboardNavigator;
