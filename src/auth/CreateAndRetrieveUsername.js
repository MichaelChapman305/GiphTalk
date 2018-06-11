import firebase from 'react-native-firebase';

const createName = async (username, uid) => {
  const usernameExists = await firebase
    .database()
    .ref()
    .child('users')
    .orderByChild('username')
    .equalTo(username)
    .once('value', snapshot => {
      const name = snapshot.val();
      if (name) {
        return true;
      }
      return false;
    });

  if (usernameExists._value) {
    return 'error';
  }

  firebase
    .database()
    .ref()
    .child(`users/${uid}`)
    .set({
      username,
    });
};

const getName = async uid => {
  const username = await firebase
    .database()
    .ref(`users/${uid}/username`)
    .once('value');

  return username._value;
};

export const createUsername = createName,
  getUsername = getName;
