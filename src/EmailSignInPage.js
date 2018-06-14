import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';

import firebaseAuth from './auth/FirebaseAuth.js';
import { createUsername } from './auth/CreateAndRetrieveUsername.js';

export default class EmailSignInPage extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    errorMessage: null,
  };

  handleEmailSignUp = async () => {
    const { email, password, username } = this.state;
    const { navigate } = this.props.navigation;
    const data = [email, password];

    const userData = await firebaseAuth('create user', data);
    const uid = userData.user.uid;

    if (typeof userData === 'object') {
      const nameExists = await createUsername(username, uid);

      if (nameExists === 'error') {
        this.setState({ errorMessage: 'Username already exists, please choose a different name' });
      } else {
        navigate('Home', { uid });
      }
    } else {
      this.setState({ errorMessage: userData });
    }
  };

  render() {
    const { errorMessage, username, email, password } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Sign Up</Text>
        {errorMessage && <Text>{errorMessage}</Text>}
        <TextInput
          autoCapitalize="none"
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
          value={username}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={password => this.setState({ password })}
          value={password}
        />
        <Button title="Sign Up" onPress={this.handleEmailSignUp} />
        <Button title="Already have an account? Login" onPress={() => navigate('EmailLogin')} />
      </View>
    );
  }
}
