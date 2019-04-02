import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';
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
          style={styles.list}
          data={rootStore.storeStore.stores}
          keyExtractor={store => store.id}
          renderItem={store => (
            <View style={styles.listItem} key={store.item.id}>
              <Text>Name: {store.item.name}; Books: {store.item.totalBooks}</Text>
            </View>
          )}
        />

        <Text>Number of stores: {rootStore.storeStore.totalStores}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  header: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 32,
    marginTop: 16,
    paddingBottom: 16,
  },
  code: {
    fontFamily: 'monospace'
  },
  list: {
    borderBottomWidth: 2,
    borderColor: '#4e4e4e',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'powderblue',
    borderWidth: 1,
    borderColor: '#aaaaaa',
    padding: 16
  }
});

export default HomeScreen;
