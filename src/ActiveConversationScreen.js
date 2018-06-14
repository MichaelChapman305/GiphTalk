import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import RetroMapStyles from './RetroMapStyles.json';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class ActiveConversationScreen extends Component {
  state = {
    username: '',
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };

  componentDidMount() {
    const { navigation } = this.props;

    const username = navigation.getParam('username');
    this.setState({ username });

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        }, () => {
          storeLocation(this.state.region);
        });
      }
    );
  };

  signOutUser = async () => {
    const { navigate } = this.props.navigation;
    try {
      await firebase.auth().signOut();
      navigate('Auth');
    } catch (e) {
      console.log(e);
    }
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const { region } = this.state;
    return (
      <View>
        <Text>This is my Active Conversation Screen</Text>
        <Text>Hello, {this.state.username}!</Text>
        <Button title="Sign out" onPress={this.signOutUser} />
        <MapView
          provider={ PROVIDER_GOOGLE }
          style={ styles.container }
          customMapStyle={ RetroMapStyles }
          showsUserLocation={ true }
          region={ region }
          onRegionChange={ region => this.setState({ region }) }
          onRegionChangeComplete={ region => this.setState({ region }) }
        >
          <MapView.Marker
            coordinate={ region }
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '75%',
    width: '100%',
  }
});
