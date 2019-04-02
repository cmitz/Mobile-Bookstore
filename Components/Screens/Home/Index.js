import React from 'react';
import { StyleSheet, Image, Platform, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Container, Content, Card, CardItem, Body, Button, Text, Spinner } from 'native-base';

import { BACKGROUND_TASK_LOCATION_TRACKING } from '../../../Tasks';

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
    permissionStatus: 'Pending',
    locationStatus: 'Pending',
    counter: 0,
  }

  async componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({ locationStatus: 'This will not work on Sketch in an Android emulator!' });
    } else {
      await this.askLocationPermission();
      await this.getLocation();
    }
  }

  async askLocationPermission() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    switch (status) {
      case 'granted':
        if (Platform.OS === 'ios') {
          // Todo implement iOS
        } else if (Platform.OS === 'android') {
          this.setState({ permissionStatus: 'Granted' });
        }
        break;
      case 'denied':
      default:
        this.setState({ permissionStatus: 'Denied' });
        break;
    }
  }

  async getLocation() {
    const { counter } = this.state;
    const { locationStore } = this.props.rootStore;

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationStatus: 'Location retrieved', counter: counter + 1 });

    locationStore.updateLocation(location.coords);
  }

  async startBackgroundUpdate() {
    await Location.startLocationUpdatesAsync(BACKGROUND_TASK_LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Low,
      timeInterval: 100, // 10 seconds
      showsBackgroundLocationIndicator: true,
    });
  }

  async stopBackgroundUpdate() {
    await Location.stopLocationUpdatesAsync(BACKGROUND_TASK_LOCATION_TRACKING);
  }

  async backgroundLocationRunning() {
    const result = await Location.hasStartedLocationUpdatesAsync(BACKGROUND_TASK_LOCATION_TRACKING);
    console.log(result);
    return result;
  }

  render() {
    const { welcomeText, locationStatus, counter } = this.state;
    const { navigation, rootStore } = this.props;

    const headerimage = require('../../../assets/markus-spiske-221494-unsplash.jpg');

    return (
      <Container>
        <Image source={headerimage} style={{ width: 420, height: 100 }} />

        <Content padder contentContainerStyle={styles.content}>
          <Text style={styles.header}>{welcomeText}</Text>

          {/* <Button onPress={() => navigation.navigate('Stores', { message: 'This message was brought to you by HomeScreen' })}>
            <Text>Stores</Text>
          </Button> */}

          <Button
            // disabled={this.backgroundLocationRunning()}
            onPress={() => this.startBackgroundUpdate()}
          >
            <Text>Enable background location updates</Text>
          </Button>

          <Button
            // disabled={!this.backgroundLocationRunning()}
            onPress={() => this.stopBackgroundUpdate()}
          >
            <Text>Disable background location updates</Text>
          </Button>

          <View style={styles.divider}/>

          <Card>
            <CardItem header bordered>
              <Text>{`Location (${counter})`}</Text>
            </CardItem>

            <CardItem>
              <Body>
                <Text>Location status: <Text style={styles.code}>{locationStatus}</Text></Text>
                <Text>You are at {`lat: ${rootStore.locationStore.latitude}; long: ${rootStore.locationStore.longitude}.`}</Text>
                <Button
                  onPress={() => {
                    this.setState({ locationStatus: 'Pending' });
                    this.getLocation();
                  }}
                  disabled={locationStatus === 'Pending'}
                >
                  <Text>Refresh Location</Text>
                </Button>
                {locationStatus === 'Pending' && <Spinner />}
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
    marginTop: 16,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    alignItems: 'stretch',
  },
  divider: {
    height: 1,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    marginTop: 32,
    marginBottom: 24,
  },
  code: {
    fontFamily: 'monospace',
    backgroundColor: '#4c4c4c',
    color: 'white',
  }
});
