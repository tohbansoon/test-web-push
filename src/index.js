import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { firebaseConfig, messagingPublickKey } from "./config";
import firebase from "firebase";

// step 1: register service worker
registerFirebaseServiceWorker();

// step 2: initialize app and firebase messaging
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);
messaging.usePublicVapidKey(messagingPublickKey);

// step 3: getFcmToken
getFcmToken();

// step 4: listen to fcmToken changed
listenFcmTokenChanged();

// step 5: start to listening notification message
onListenWebPushNotif();

function registerFirebaseServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch((err) => {
        console.log("Service worker registration failed, error:", err);
      });
  }
}

function unRegisterFirebaseServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}

function getFcmToken() {
  messaging
    .getToken()
    .then((fcmToken) => {
      if (fcmToken) {
        // receoved fcmToken
        console.log("fcmToken: ", fcmToken);
      } else {
        // Show permission request.
        console.log(
          "No Instance ID token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
}

function listenFcmTokenChanged() {
  messaging.onTokenRefresh(() => {
    console.log("fcm token changed...");
    getFcmToken();
  });
}

function onListenWebPushNotif() {
  messaging.onMessage((payload) => {
    console.log("Message received. ", payload);
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
