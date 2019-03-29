import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import drawerIcon from '../assets/drawer.png';

export default class NavigationDrawerStructure extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = () => {
    const { navigationProps } = this.props;
    navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={this.toggleDrawer}>

          <Image
            source={drawerIcon}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
