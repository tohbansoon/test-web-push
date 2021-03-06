// eslint-disable-next-line
importScripts("https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js");
// eslint-disable-next-line
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.4/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCmJqdwkYlCsmEWhYj4gFLVEBZcwA0qz2U",
  authDomain: "test-web-push-a8f76.firebaseapp.com",
  databaseURL: "https://test-web-push-a8f76.firebaseio.com",
  projectId: "test-web-push-a8f76",
  storageBucket: "test-web-push-a8f76.appspot.com",
  messagingSenderId: "295246109385",
  appId: "1:295246109385:web:8b0b2a54ef81a00b694b18",
  measurementId: "G-GGE0S7MWT9",
};

// eslint-disable-next-line
const app = firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line
const messaging = firebase.messaging(app);

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus)
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = "You have new order";
  const notificationOptions = {
    body: "XXXX send u an order",
    icon: "/logo192.png",
  };

  // eslint-disable-next-line
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// eslint-disable-next-line
self.addEventListener("notificationclick", function (event) {
  console.log("u click the notification", event);
});
