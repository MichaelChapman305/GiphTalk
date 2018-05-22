import React, { Component } from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';

import LoadingScreen from './LoadingScreen.js';
import ActiveConversationScreen from './ActiveConversationScreen.js';
import SignInScreen from './SignInScreen.js';

const AppStack = StackNavigator({ Home: ActiveConversationScreen });
const AuthStack = StackNavigator({ SignIn: SignInScreen });

const NavigationStack = SwitchNavigator(
  {
    AuthLoading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default class Navigator extends Component {
  render() {
    return <NavigationStack />;
  }
}
