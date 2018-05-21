import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import styles from './styles.js';

export default class LoginScreen extends Component {
  onLoginOrRegister = () => {
  LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        return Promise.reject(new Error('The user cancelled the request'));
      }
      // Retrieve access token
      return AccessToken.getCurrentAccessToken();
    })
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      // Login with the credential
      return firebase.auth().signInWithCredential(credential);
    })
    .then((user) => {
      //User info handling
    })
    .catch((error) => {
      const { code, message } = error;
      //Error handling
    });
}

  render() {
    return (
      <View>
        <Text style={styles.container}>This is my Login Screen</Text>
        <Button style={styles.container} title="Facebook" onPress={this.onLoginOrRegister} />
      </View>
    );
  }
}
