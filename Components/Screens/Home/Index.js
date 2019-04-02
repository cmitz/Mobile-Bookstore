import React from 'react';
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Container, Content, Card, CardItem, Body, Button, Text } from 'native-base';

@inject('rootStore')
@observer
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
    const { navigation, rootStore } = this.props;

    const locationStore = rootStore.locationStore;

    return (
      <Container>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} style={{ width: 420, height: 100 }} />

        <Content padder>
          <Text style={styles.header}>{welcomeText}</Text>

          <Button onPress={() => navigation.navigate('Stores', { message: 'This message was brought to you by HomeScreen' })}>
            <Text>Stores</Text>
          </Button>

          <Card>
            <CardItem header bordered>
              <Text>Location</Text>
            </CardItem>

            <CardItem>
              <Body>
                <Text>You are at {`lat: ${locationStore.latitude}; long: ${locationStore.longtitude}.`}</Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>{`Last updated at: ${locationStore.updatedAt}`}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    marginTop: 40,
    paddingBottom: 16,
  }
});
