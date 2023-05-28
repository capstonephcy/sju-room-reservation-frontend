// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCoS-EC2nl_J61W8reaYsRIz66oizKReeA",
  authDomain: "capstone-5641d.firebaseapp.com",
  projectId: "capstone-5641d",
  storageBucket: "capstone-5641d.appspot.com",
  messagingSenderId: "251929075807",
  appId: "1:251929075807:web:b656edd5dd978dd0423bea"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});