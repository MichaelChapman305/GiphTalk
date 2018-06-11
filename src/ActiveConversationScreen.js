import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';

import styles from './styles.js';

export default class ActiveConversationScreen extends Component {
  state = {
    username: '',
  };

  componentDidMount() {
    const { navigation } = this.props;

    const username = navigation.getParam('username');

    this.setState({ username });
  };

  signOutUser = async () => {
    const { navigate } = this.props.navigation;
    try {
      await firebase.auth().signOut();
      navigate('Auth');
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.container}>This is my Active Conversation Screen</Text>
        <Text>Hello, {this.state.username}!</Text>
        <Button style={styles.container} title="Sign out" onPress={this.signOutUser} />
      </View>
    );
  }
}
