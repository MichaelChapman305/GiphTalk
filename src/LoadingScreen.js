import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';

import styles from './styles.js';

export default class LoadingScreen extends Component {
  componentDidMount() {
    const { navigate } = this.props.navigation;

    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user._user.uid;

        navigate('Home', { uid });
      } else {
        navigate('Auth');
      }
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
      <View style={styles.Container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
