import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoadingScreen from './LoadingScreen.js';
import MapViewScreen from './MapViewScreen.js';
import SignInScreen from './SignInScreen.js';
import EmailLoginPage from './EmailLoginPage.js';
import EmailSignInPage from './EmailSignInPage.js';
import FacebookUsernameCreation from './FacebookUsernameCreation.js';

const AppStack = createStackNavigator({ Home: MapViewScreen });

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  EmailSignIn: EmailSignInPage,
  EmailLogin: EmailLoginPage,
  FacebookUsernameCreation,
});

const NavigationStack = createSwitchNavigator(
  {
    AuthLoading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default class Navigator extends Component {
  render() {
    return <NavigationStack />;
  }
}
