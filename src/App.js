import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';

import styles from './styles.js';
import ActiveConversationScreen from './ActiveConversationScreen.js';
import LoginScreen from './LoginScreen.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    if (this.state.loading) {
      return null;
    } else if (this.state.user) {
      return <RootStack />;
    }
    return <LoginScreen />;
  }
}


const RootStack = createStackNavigator(
  {
    Home: ActiveConversationScreen
  },
  {
    initialRouteName: 'Home',
  }
);
