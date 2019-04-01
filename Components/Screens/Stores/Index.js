import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';
import { FlatList } from 'react-native-gesture-handler';

import { stylesheet } from '../../../Styles/stylesheet';
@inject('apiKeysStore', 'jsonApiStore')
@observer
class HomeScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Stores',
  };

  state = {
    screenTitle: 'All the stores',
    storesLoading: false
  }

  async componentDidMount() {
    const { jsonApiStore, navigation } = this.props;

    try {
      await jsonApiStore.fetchStores();
    } catch (e) {
      console.error(e);
      navigation.navigate("Dashboard");
    }
  }

  render() {
    const { screenTitle, storesLoading } = this.state;
    const { jsonApiStore } = this.props;

    return (
      <View style={stylesheet.container}>
        <Text style={stylesheet.header}>{screenTitle}</Text>
        <Text>{storesLoading ? 'Loading' : 'Finished loading'}</Text>

        <FlatList
          data={jsonApiStore.stores}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <Text style={stylesheet.code}>{JSON.stringify(item, null, 2)}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default HomeScreen;
