import firebase from 'react-native-firebase';

const store = async (region) => {
  console.log('store');
  /*firebase
    .database()
    .ref()
    .child(`users/${uid}`)
    .set({
      username,
    });*/
};

const get = async () => {
  console.log('get');
};

export const storeLocation = store,
             getLocations = get;
