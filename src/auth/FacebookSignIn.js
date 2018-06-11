import { AccessToken, LoginManager } from 'react-native-fbsdk';

const onLoginOrRegisterFacebook = async () => {
  const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    return Promise.reject(new Error('The user cancelled the request'));
  }

  const data = await AccessToken.getCurrentAccessToken();
  return data;
};

export default onLoginOrRegisterFacebook;
