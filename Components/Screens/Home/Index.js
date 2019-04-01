import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import PropTypes from 'prop-types';

export default class HomeScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Home',
  };

  state = {
    welcomeText: 'Hello, World!'
  }

  render() {
    const { welcomeText } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} style={{ width: 420, height: 100 }} />
        <Text style={styles.header}>{welcomeText}</Text>
        <Button onPress={() => navigation.navigate('Stores', { message: 'This message was brought to you by HomeScreen' })} title="Stores" />
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
  }
});
