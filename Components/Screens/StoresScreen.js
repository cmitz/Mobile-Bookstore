import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { PropTypes } from 'prop-types';

export default class HomeScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    screenTitle: 'All the stores'
  }

  render() {
    const { screenTitle } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>{screenTitle}</Text>
        <Button onPress={() => navigation.navigate('Home')} title="Home" />

        <Text>{navigation.getParam('message', 'no message')}</Text>
        <Text>{navigation.getParam('itemId', 'no itemId')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
});
