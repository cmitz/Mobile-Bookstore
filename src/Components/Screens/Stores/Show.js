import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { PropTypes } from 'prop-types';

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
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 32,
    marginTop: 40,
    paddingBottom: 16,
  },
  code: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
});
