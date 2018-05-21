import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import styles from './styles.js';

export default class ActiveConversationScreen extends Component {
  render() {
    return (
      <View>
        <Text style={styles.container}>This is my Active Conversation Screen</Text>
      </View>
    );
  }
}
