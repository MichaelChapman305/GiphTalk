import firebase from 'react-native-firebase';

const firebaseAuth = async (type, data) => {
  if (type === 'facebook') {
    const credential = await firebase.auth.FacebookAuthProvider.credential(data.accessToken);

    try {
      const userData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      return userData;
    } catch (error) {
      throw new Error('Something went wrong retrieving user data');
    }
  } else if (type === 'create user') {
    try {
      const userData = await firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(data[0], data[1]);

      return userData;
    } catch (error) {
      const { code, message } = error;
      return message;
    }
  } else if (type === 'login') {
    try {
      const userData = await firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(data[0], data[1]);

      return userData;
    } catch (error) {
      const { code, message } = error;
      return message;
    }
  }
};

export default firebaseAuth;
