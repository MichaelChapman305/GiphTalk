import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';

import styles from './styles.js';

export default class ActiveConversationScreen extends Component {
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Auth');
    } catch (e) {
        console.log(e);
    }
}

  render() {
    return (
      <View>
        <Text style={styles.container}>This is my Active Conversation Screen</Text>
        <Button style={styles.container} title="Sign out" onPress={this.signOutUser} />
      </View>
    );
  }
}
