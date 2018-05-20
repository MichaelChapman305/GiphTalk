import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import styles from './styles.js';

export default class App extends Component {
  render() {
    return(
      <View>
        <Text style={styles.container}>Hello World</Text>
      </View>
    );
  }
}
