import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';

export default class HomeScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Stores',
  };

  state = {
    screenTitle: 'All the stores'
  }

  render() {
    const { screenTitle } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{screenTitle}</Text>

        <Text>{navigation.getParam('message', 'no message')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    fontSize: 32,
    paddingBottom: 16,
  }
});
