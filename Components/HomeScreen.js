import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import PropTypes from 'prop-types';

export default class HomeScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    welcomeText: "Hello, World!"
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.welcomeText}</Text>
        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg" }} style={{width: 293, height: 110}} />
        <Button onPress={() => this.setState({ welcomeText: 'Pls Kill Me' })} title="Click Me!" />
        <Button onPress={() => this.props.navigation.navigate('Stores')} title="Stores" />
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
