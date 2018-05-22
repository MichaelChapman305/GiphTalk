import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';
import firebase from 'react-native-firebase';

import styles from './styles.js';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;

    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      navigate(user ? 'App' : 'Auth');
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }
  
  render() {
    return(
      <View style={styles.Container}>
        <StatusBar />
      </View>
    );
  }
}
