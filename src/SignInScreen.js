import React, { Component } from 'react';
import { Text, View, Button, Modal, TouchableHighlight } from 'react-native';

import firebaseAuth from './auth/FirebaseAuth.js';
import onLoginOrRegisterFacebook from './auth/FacebookSignIn.js';
import { getUsername } from './auth/CreateAndRetrieveUsername.js';
import styles from './styles.js';

export default class SignInScreen extends Component {
  state = {
    modalVisible: false,
  };

  handleFacebookLogin = async () => {
    const { navigate } = this.props.navigation;

    const data = await onLoginOrRegisterFacebook();
    const userData = await firebaseAuth('facebook', data);
    const username = await getUsername(userData.user.uid);

    if (userData.additionalUserInfo.isNewUser || !username) {
      navigate('FacebookUsernameCreation', { userData });
    } else {
      const uid = userData.user.uid;
      navigate('Home', { uid, username });
    }
  };

  emailLoginModal = visible => {
    this.setState({ modalVisible: visible });
  };

  navigateLoginPage = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('EmailLogin');
  };

  navigateSignInPage = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('EmailSignIn');
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <View>
        <Text style={styles.container}>This is my Login Screen</Text>
        <Button
          style={styles.container}
          title="Facebook sign in"
          onPress={this.handleFacebookLogin}
        />
        <Button
          style={styles.container}
          title="Sign in with email"
          onPress={this.emailLoginModal}
        />
        {modalVisible && (
          <Modal animationType="slide" transparent={false} visible={modalVisible}>
            <View style={{ marginTop: 22 }}>
              <View>
                <Button title="Already have an account?" onPress={this.navigateLoginPage} />
                <Button title="Don't have an account yet?" onPress={this.navigateSignInPage} />
                <TouchableHighlight
                  onPress={() => {
                    this.emailLoginModal(!modalVisible);
                  }}
                >
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  }
}
