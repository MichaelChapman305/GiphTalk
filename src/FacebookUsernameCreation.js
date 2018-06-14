import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';

import { createUsername } from './auth/CreateAndRetrieveUsername.js';

export default class FacebookUsernameCreation extends Component {
  state = {
    username: '',
    errorMessage: null,
  };

  handleUsernameCreation = async () => {
    const { username, errorMessage } = this.state;
    const { navigate, getParam } = this.props.navigation;

    const data = getParam('userData');
    const uid = data.user.uid;
    const nameExists = await createUsername(username, uid);

    if (nameExists === 'error') {
      this.setState({ errorMessage: 'Username already exists, please choose a different name' });
    } else {
      navigate('Home', { uid });
    }
  };

  render() {
    const { errorMessage, username } = this.state;
    return (
      <View>
        <Text>Create Username</Text>
        {errorMessage && <Text>{errorMessage}</Text>}
        <TextInput
          autoCapitalize="none"
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
          value={username}
        />
        <Button title="Create name" onPress={this.handleUsernameCreation} />
      </View>
    );
  }
}
