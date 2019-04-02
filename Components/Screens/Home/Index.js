import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Container, Content, Card, CardItem, Body, Button, Text } from 'native-base';
import { getSnapshot } from 'mobx-state-tree';

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
    welcomeText: 'Hello, World!',
    locationStatus: 'Pending',
    counter: 0,
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({ locationStatus: 'This will not work on Sketch in an Android emulator!' });
    } else {
      this._getLocationAsync();
    }
  }

  async _getLocationAsync() {
    const { counter } = this.state;
    const { locationStore } = this.props.rootStore;

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ locationStatus: 'Permission denied' });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationStatus: 'Location retrieved', counter: counter + 1 });

      locationStore.updateLocation(location.coords)
    }
  }

  render() {
    const { welcomeText, locationStatus, counter } = this.state;
    const { navigation, rootStore } = this.props;

    return (
      <Container>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} style={{ width: 420, height: 100 }} />

        <Content padder contentContainerStyle={styles.content}>
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
                <Text>Location status: <Text style={styles.code}>{`${locationStatus} (${counter})`}</Text></Text>
                <Text>You are at {`lat: ${rootStore.locationStore.latitude}; long: ${rootStore.locationStore.longitude}.`}</Text>
                <Button
                  onPress={() => {
                    this.setState({ locationStatus: 'Pending' });
                    this._getLocationAsync();
                  }}
                >
                  <Text>Refresh Location</Text>
                </Button>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>{`Last updated at: ${rootStore.locationStore.updatedAt}`}</Text>
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
  },
  content: {
    flex: 1,
    alignItems: 'flex-start'
  },
  code: {
    fontFamily: 'monospace',
    backgroundColor: '#4c4c4c',
    color: 'white',
  }
});
