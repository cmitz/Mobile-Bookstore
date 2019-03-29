import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  state = {
    welcomeText: "Hello, World!"
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.welcomeText}</Text>
        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg" }} style={{width: 293, height: 110}} />
        <Button onPress={() => this.setState({ welcomeText: 'Pls Kill Me' })} title="Click Me!" />
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
  },
});
