import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { updateLocation, removeLocation, getLocations } from './locations/StoreAndRetrieveLocations.js';
import RetroMapStyles from './RetroMapStyles.json';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapViewScreen extends Component {
  state = {
    displayName: '',
    userUid: '',
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    markers: [],
  };

  componentDidMount() {
    const { userUid, region } = this.state;
    const { navigation } = this.props;

    const uid = navigation.getParam('uid');
    const username = navigation.getParam('username');

    this.setState({
      displayName: username,
      userUid: uid,
    });

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      });
    },
    error => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      });
      this.handleMarkers();
    });
  };

  handleMarkers = async () => {
    const { region, userUid } = this.state;
    const markers = [];

    const city = await updateLocation(region, userUid);
    const otherUsers = await getLocations(city, userUid);

    for (let i = 0; i < otherUsers.length; i++) {
      markers.push(otherUsers[i]);
    };

    this.setState({ markers });
  };

  signOutUser = async () => {
    const { region, userUid } = this.state;
    const { navigate } = this.props.navigation;

    try {
      removeLocation(region, userUid);
      firebase.auth().signOut();
      this.props.navigation.navigate('Auth');
    } catch (e) {
      console.log(e);
    }
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  };

  render() {
    const { region, displayName, markers } = this.state;
    return (
      <View>
        <Text>This is my Active Conversation Screen</Text>
        <Text>Hello, {displayName}!</Text>
        <Button title="Sign out" onPress={this.signOutUser} />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          customMapStyle={RetroMapStyles}
          zoomEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          showsUserLocation
          region={region}
          onRegionChange={region => this.setState({ region })}
          onRegionChangeComplete={region => this.setState({ region })}
        >
          {markers.map(marker => {
            return (
              <Marker
                coordinate={marker.coords}
                title={marker.username}
                description={'hello'}
              />
            )
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '75%',
    width: '100%',
  },
});
