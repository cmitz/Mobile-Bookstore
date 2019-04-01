import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';

import { stylesheet } from '../../../Styles/stylesheet';

export default class HomeScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Store',
  };

  state = {
    screenTitle: 'One store'
  }

  render() {
    const { screenTitle } = this.state;
    const { navigation } = this.props;

    return (
      <View style={stylesheet.container}>
        <Text style={stylesheet.header}>{screenTitle}</Text>

        <Text>{navigation.getParam('message', 'no message')}</Text>
      </View>
    );
  }
}
