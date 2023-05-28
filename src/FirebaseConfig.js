import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCoS-EC2nl_J61W8reaYsRIz66oizKReeA",
    authDomain: "capstone-5641d.firebaseapp.com",
    projectId: "capstone-5641d",
    storageBucket: "capstone-5641d.appspot.com",
    messagingSenderId: "251929075807",
    appId: "1:251929075807:web:b656edd5dd978dd0423bea"
};

// Initialize Firebase
export default firebaseConfig;

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getFirebaseToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: "BHDrTrTrasxqg3b42APFfe2-HDw5HnnX1wVJunM3Os8oEitTcIRJqXXNweec3gm475Z0cmHfi-VsTiPPWaQlGT0" })
    .then((currentToken) => {
      if (currentToken) {
        sessionStorage.setItem('fcmRegistrationToken', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        }
    );
});