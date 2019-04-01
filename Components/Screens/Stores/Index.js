import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { FlatList } from 'react-native-gesture-handler';

@inject('rootStore')
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

  render() {
    const { screenTitle, storesLoading } = this.state;
    const { rootStore } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{screenTitle}</Text>
        <Text>{storesLoading ? 'Loading' : 'Finished loading'}</Text>

        <FlatList
          data={rootStore.storeStore.stores}
          keyExtractor={store => store.id}
          renderItem={store => (
            <View key={store.item.id}>
              <Text>Name: {store.item.name}; Books: {store.item.totalBooks}</Text>
            </View>
          )}
        />

      <Text>Number of stores: {rootStore.storeStore.totalStores}</Text>
      {/* <Text>{JSON.stringify(rootStore.storeStore.stores, null, 2)}</Text> */}
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
  },
  code: {
    fontFamily: 'monospace'
  },
});

export default HomeScreen;
