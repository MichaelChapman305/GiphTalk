import firebase from 'react-native-firebase';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API } from 'react-native-dotenv';

const update = async (region, uid) => {
  Geocoder.init(GOOGLE_API);

  const location = await Geocoder.from({
    latitude: region.latitude,
    longitude: region.longitude,
  });

  const city = `${location.results[0].address_components[2].long_name},
                ${location.results[0].address_components[5].short_name}`;

  firebase
    .database()
    .ref()
    .child(`users/${uid}/region`)
    .update({ city });

  firebase
    .database()
    .ref()
    .child(`users/${uid}/region/coords`)
    .update(region);

  return city;
};

const remove = async (region, uid) => {
  firebase
    .database()
    .ref()
    .child(`users/${uid}/region`)
    .remove();
};

const get = async city => {
  const markers = await firebase
    .database()
    .ref()
    .child('users')
    .orderByChild('region/city')
    .equalTo(city)
    .on('value', snapshot => {});

  return markers;
};

export const updateLocation = update,
  removeLocation = remove,
  getLocations = get;
