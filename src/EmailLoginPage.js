import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';

import firebaseAuth from './auth/FirebaseAuth.js';
import { getUsername } from './auth/CreateAndRetrieveUsername.js';

export default class EmailLoginPage extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleEmailLogin = async () => {
    const { email, password } = this.state;
    const { navigate } = this.props.navigation;
    const data = [email, password];

    const userData = await firebaseAuth('login', data);

    if (typeof userData === 'object') {
      const username = await getUsername(userData.user.uid);

      navigate('Home', { username });
    } else {
      this.setState({ errorMessage: userData });
    }
  };

  render() {
    const { errorMessage, email, password } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Login</Text>
        {errorMessage && <Text>{errorMessage}</Text>}
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={email}
        />
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={password}
        />
        <Button title="Login" onPress={this.handleEmailLogin} />
        <Button title="Don't have an account? Sign Up" onPress={() => navigate('SignUp')} />
      </View>
    );
  }
}
