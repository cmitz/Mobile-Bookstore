import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  state = {
    screenTitle: "All the stores"
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.screenTitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
});
