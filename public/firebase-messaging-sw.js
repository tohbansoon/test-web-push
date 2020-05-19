// eslint-disable-next-line
importScripts("https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js");
// eslint-disable-next-line
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.4/firebase-messaging.js"
);

// eslint-disable-next-line
const messaging = firebase.messaging();

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
