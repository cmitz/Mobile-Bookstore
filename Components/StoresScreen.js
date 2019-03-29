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
    screenTitle: "All the stores"
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.screenTitle}</Text>
        <Button onPress={() => this.props.navigation.navigate('Home')} title="Home" />
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
