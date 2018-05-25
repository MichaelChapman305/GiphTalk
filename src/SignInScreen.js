import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import styles from './styles.js';

export default class SignInScreen extends Component {
  onLoginOrRegister = async () => {
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      return Promise.reject(new Error('The user cancelled the request'));
    }
    // Retrieve access token
    const data = await AccessToken.getCurrentAccessToken();

    // Create a new Firebase credential with the token
    const credential = await firebase.auth.FacebookAuthProvider.credential(data.accessToken);

    try {
      // Login with the credential
      const userData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      //User info handling with userData
      this.props.navigation.navigate('App');
      
    } catch(err) {
      throw new Error('Something went wrong retrieving user data');
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.container}>This is my Login Screen</Text>
        <Button style={styles.container} title="Facebook sign in" onPress={this.onLoginOrRegister} />
      </View>
    );
  }
}
