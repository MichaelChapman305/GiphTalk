import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';

import { getUsername } from './auth/CreateAndRetrieveUsername.js';
import styles from './styles.js';

export default class LoadingScreen extends Component {
  componentDidMount() {
    const { navigate } = this.props.navigation;

    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user._user.uid;

        getUsername(uid).then(username => {
          navigate('Home', { uid, username });
        });
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
